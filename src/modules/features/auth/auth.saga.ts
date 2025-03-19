import { IEvent, ofType, Saga } from '@nestjs/cqrs'
import { Injectable } from '@nestjs/common'
import { map, Observable } from 'rxjs'

// Commands
import { SendEmailCommand } from 'src/modules/core/mail/commands/send-email.command'
import { MarkOtpUsedCommand } from './commands/mark-otp-used.command'

// Events
import { PasswordResetEvent } from './events/password-reset.event'
import { OtpCreatedEvent } from './events/otp-created.event'
import { OtpUsedEvent } from './events/otp-used.event'

// Generators
import { generateMailSubject } from 'src/lib/generators/generate-mail-subject'

// Constants
import { APP_NAME } from 'src/lib/constants'

/**
 * Auth Saga
 * @description Handles all side effects for the Auth module
 */
@Injectable()
export class AuthSaga {
  /**
   * @description When an otp is used mark it as used
   * @param {Observable<IEvent>} events$ - Event stream
   * @returns {Observable<MarkOtpUsedCommand>}
   */
  @Saga()
  otpCreated(
    events$: Observable<IEvent>
  ): Observable<SendEmailCommand<'reset-password' | 'verify-email'>> {
    return events$.pipe(
      ofType(OtpCreatedEvent),
      map(event => {
        const { email, otp, type, ...userDetails } = event.data
        if (type === 'PASSWORD_RESET') {
          return new SendEmailCommand({
            to: email,
            subject: generateMailSubject(type),
            template: 'reset-password',
            data: {
              otpCode: otp,
              email,
              ...userDetails
            }
          })
        } else {
          return new SendEmailCommand({
            to: email,
            subject: generateMailSubject(type),
            template: 'verify-email',
            data: {
              otpCode: otp,
              ...userDetails
            }
          })
        }
      })
    )
  }

  /**
   * @description When a user has reset their password, send them an email
   * @param {Observable<IEvent>} events$ - Event stream
   * @returns {Observable<SendEmailCommand<'password-reset'>>}
   */
  @Saga()
  passwordResetEvent(events$: Observable<IEvent>): Observable<SendEmailCommand<'password-reset'>> {
    return events$.pipe(
      ofType(PasswordResetEvent),
      map(event => {
        const { email, firstName, lastName } = event.user

        return new SendEmailCommand({
          to: email as string,
          template: 'password-reset',
          subject: `Your password has been reset - ${APP_NAME}`,
          data: {
            email: email as string,
            firstName: firstName as string,
            lastName: lastName as string
          }
        })
      })
    )
  }

  /**
   * @description When an otp is used mark it as used
   * @param {Observable<IEvent>} events$ - Event stream
   * @returns {Observable<MarkOtpUsedCommand>}
   */
  @Saga()
  markOtpAsUsed(events$: Observable<IEvent>): Observable<MarkOtpUsedCommand> {
    return events$.pipe(
      ofType(OtpUsedEvent),
      map(event => new MarkOtpUsedCommand(event))
    )
  }
}

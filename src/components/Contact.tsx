import { getTranslations } from 'next-intl/server'
import TerminalSection from '@/components/terminal/TerminalSection'
import ToolCallHeader from '@/components/terminal/ToolCallHeader'
import Spinner from '@/components/terminal/Spinner'
import Glyph from '@/components/terminal/Glyph'
import { CMD, SPIN_LABEL, TOOL } from '@/components/terminal/commands'
import ContactForm from '@/components/ContactForm'

const [MAIL_BIN, ...MAIL_ARGS] = CMD.mail.split(' ')

export default async function Contact() {
  const t = await getTranslations('contact')

  // 키는 ~/.contacts 키 이름이라 번역하지 않는다 (ADR ④)
  const contacts = [
    { key: 'email', href: 'mailto:wjjasd@gmail.com', label: 'wjjasd@gmail.com' },
    { key: 'github', href: 'https://github.com/wjjasd', label: 'github.com/wjjasd' },
    { key: 'linkedin', href: 'https://www.linkedin.com/in/kjyang1994', label: t('linkedin_display') },
    { key: 'blog', href: 'https://dev-yangkj.tistory.com/', label: 'dev-yangkj.tistory.com' },
  ]

  const field = (id: string, label: string, flag: string) => (
    <label htmlFor={id}>
      {label}
      <span className="flag" aria-hidden="true">
        {flag}
      </span>
    </label>
  )

  return (
    <TerminalSection id="contact" cmd={CMD.contact} title={t('title')}>
      <div className="out">
        <p>{t('subtitle')}</p>
        <dl className="kv contacts">
          {contacts.map((c) => {
            const external = !c.href.startsWith('mailto:')
            return (
              <div key={c.key} className="contents">
                <dt>{c.key}</dt>
                <dd>
                  <a href={c.href} {...(external && { target: '_blank', rel: 'noopener noreferrer' })}>
                    {c.label}
                    {external && <span aria-hidden="true"> ↗</span>}
                  </a>
                </dd>
              </div>
            )
          })}
        </dl>

        <ContactForm
          labelledBy="cf-title"
          messages={{
            sending: t('form_submitting'),
            success: t('form_success'),
            error: t('form_error'),
            submit: t('form_submit'),
            hint: t('form_hint'),
          }}
          log={{
            sending: (
              <ToolCallHeader
                tool={TOOL.send}
                args="message"
                state="pending"
                summary={<Spinner label={SPIN_LABEL.sending} />}
              />
            ),
            success: (
              <ToolCallHeader
                tool={TOOL.send}
                args="message"
                summary={
                  <span className="text-success">
                    <Glyph name="check" /> delivered
                  </span>
                }
              />
            ),
            error: (
              <ToolCallHeader
                tool={TOOL.send}
                args="message"
                state="fail"
                summary={
                  <span className="text-error">
                    <Glyph name="cross" /> failed
                  </span>
                }
              />
            ),
          }}
        >
          <p className="prompt prompt-static" aria-hidden="true">
            <span className="ps1">
              <Glyph name="prompt" />
            </span>{' '}
            <span className="text-fg-strong">{MAIL_BIN}</span> <span className="text-fg-muted">{MAIL_ARGS.join(' ')}</span>
          </p>
          <h3 id="cf-title" className="form-title">
            {t('form_title')}
          </h3>
          <div className="two">
            <div className="field">
              {field('cf-name', t('form_name'), '--name')}
              <input id="cf-name" name="name" required autoComplete="name" placeholder={t('form_name_placeholder')} />
            </div>
            <div className="field">
              {field('cf-email', t('form_email'), '--email')}
              <input id="cf-email" name="email" type="email" required autoComplete="email" placeholder="example@email.com" />
            </div>
          </div>
          <div className="field">
            {field('cf-message', t('form_message'), '--body')}
            <textarea id="cf-message" name="message" required rows={5} placeholder={t('form_message_placeholder')} />
          </div>
        </ContactForm>
      </div>
    </TerminalSection>
  )
}

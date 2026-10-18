import type { ReactNode } from 'react'
import { getTranslations } from 'next-intl/server'
import TerminalSection from '@/components/terminal/TerminalSection'
import ImageDialog from '@/components/ImageDialog'
import { CMD } from '@/components/terminal/commands'
import { skillGroups } from '@/data/skills'

const CERT_DATE = '2019.11'

export default async function Skills() {
  const t = await getTranslations('skills')

  return (
    <TerminalSection id="skills" cmd={CMD.skills} title={t('title')}>
      <div className="out">
        <p className="legend">
          {t.rich('legend', { b: (chunks: ReactNode) => <b className="text-fg-strong">{chunks}</b> })}
        </p>
        {skillGroups.map((group) => (
          <div key={group.dir} className="ls-group">
            <h3 className="ls-dir">{group.dir}</h3>
            <ul className="ls-items">
              {group.skills.map((skill) => (
                <li key={skill.name} className={skill.core ? 'core' : undefined}>
                  {skill.name}
                  {skill.core && <span className="sr-only"> ({t('core_sr')})</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="ls-group">
          <h3 className="ls-dir">certs/</h3>
          {/* <dialog>는 <p> 안에 둘 수 없어 div로 감싼다 */}
          <div className="mt-1 flex flex-wrap items-baseline gap-x-[1ch]">
            <b className="text-fg-strong">{t('cert')}</b>
            <span className="text-fg-muted">({CERT_DATE})</span>
            <ImageDialog
              src="/license.jpg"
              alt={t('cert_alt')}
              width={760}
              height={586}
              caption={`${t('cert')} (${CERT_DATE})`}
              closeLabel={t('close')}
              triggerClassName="btn-open"
            >
              {t('cert_open')} <span className="k" aria-hidden="true">↵</span>
            </ImageDialog>
          </div>
        </div>
      </div>
    </TerminalSection>
  )
}

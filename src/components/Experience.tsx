import type { ReactNode } from 'react'
import { getLocale, getTranslations } from 'next-intl/server'
import TerminalSection from '@/components/terminal/TerminalSection'
import Glyph from '@/components/terminal/Glyph'
import { CMD } from '@/components/terminal/commands'
import { experiences, education, calcTotalMonths, formatYearMonth } from '@/data/experience'

export default async function Experience() {
  const t = await getTranslations('experience')
  const lang = (await getLocale()) === 'ko' ? 'ko' : 'en'

  // 서버에서만 계산 → ISR HTML 그대로 hydration (ADR ③-7)
  const totalMonths = calcTotalMonths(experiences)
  const career = { years: Math.floor(totalMonths / 12), months: totalMonths % 12 }
  const edu = education[lang]

  return (
    <TerminalSection id="experience" cmd={CMD.experience} title={t('title')}>
      <div className="out">
        <p>{t.rich('total', { ...career, b: (chunks: ReactNode) => <b className="text-fg-strong">{chunks}</b> })}</p>
        <ol className="gitlog">
          {experiences.map((exp) => (
            <li key={exp.hash} className={exp.current ? 'commit head' : 'commit'}>
              <span className="node" aria-hidden="true">
                {exp.current ? <Glyph name="box-half" /> : '*'}
              </span>
              <div className="c-line">
                <span className="hash" aria-hidden="true">
                  {exp.hash}
                </span>
                {exp.current && (
                  <span className="ref">
                    <span aria-hidden="true">(HEAD → </span>
                    {t('current_badge')}
                    <span aria-hidden="true">)</span>
                  </span>
                )}
                <h3 className="co">{exp[lang].company}</h3>
              </div>
              <p className="c-meta">
                {formatYearMonth(exp.start)} – {exp.end ? formatYearMonth(exp.end) : t('present')} · {exp[lang].role}
              </p>
              <ul className="c-tasks">
                {exp[lang].tasks.map((task) => (
                  <li key={task}>{task}</li>
                ))}
              </ul>
            </li>
          ))}
          <li className="commit">
            <span className="node" aria-hidden="true">
              *
            </span>
            <div className="c-line">
              <span className="hash" aria-hidden="true">
                {education.hash}
              </span>
              <span className="ref tag" aria-hidden="true">
                (tag: init)
              </span>
              <h3 className="co">
                <span className="sr-only">{t('edu_sr')} </span>
                {edu.org}
              </h3>
            </div>
            <p className="c-meta">
              {formatYearMonth(education.start)} – {formatYearMonth(education.end)} · {edu.course}
            </p>
          </li>
        </ol>
      </div>
    </TerminalSection>
  )
}

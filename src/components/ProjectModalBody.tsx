'use client'

import { useLocale, useTranslations } from 'next-intl'
import Checklist from '@/components/terminal/Checklist'
import DiffBlock from '@/components/terminal/DiffBlock'
import ProjectGallery from '@/components/ProjectGallery'
import { projects } from '@/data/projects'

function ModalHeading({ children }: { children: string }) {
  return (
    <h4>
      <span className="h" aria-hidden="true">
        ##{' '}
      </span>
      {children}
    </h4>
  )
}

// 모달 본문. ProjectDialog가 처음 열릴 때 dynamic import로 불러온다 (별도 청크, 초기 HTML·JS에 없음)
export default function ProjectModalBody({ slug }: { slug: string }) {
  const t = useTranslations('projects')
  const tTerm = useTranslations('terminal')
  const lang = useLocale() === 'ko' ? 'ko' : 'en'
  const project = projects.find((p) => p.slug === slug)
  if (!project) return null
  const data = project[lang]
  const diffLabels = { before: tTerm('diff_before'), after: tTerm('diff_after') }

  return (
    <>
      <ModalHeading>{t('m_background')}</ModalHeading>
      <p>{data.background}</p>

      <ModalHeading>{t('m_roles')}</ModalHeading>
      <Checklist
        items={data.roles}
        srLabels={{ done: tTerm('status_done'), doing: tTerm('status_in_progress'), todo: tTerm('status_todo') }}
      />

      {data.diff && (
        <>
          <ModalHeading>{t('m_results')}</ModalHeading>
          <DiffBlock
            before={data.diff.map((x) => (
              <>
                {x.label} <b>{x.before}</b>
              </>
            ))}
            after={data.diff.map((x) => (
              <>
                {x.label} <b>{x.after}</b>
              </>
            ))}
            srLabels={diffLabels}
          />
        </>
      )}

      <ModalHeading>{t('m_stack')}</ModalHeading>
      <dl className="kv">
        {data.stack.map(([k, v]) => (
          <div key={k} className="contents">
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>

      {project.gallery.length > 0 && (
        <>
          <ModalHeading>{t('m_media')}</ModalHeading>
          <ProjectGallery
            items={project.gallery.map((g) => ({ type: g.type, src: g.src, alt: g.alt[lang] }))}
            labels={{ prev: t('g_prev'), next: t('g_next') }}
          />
        </>
      )}

      {project.links.length > 0 && (
        <>
          <ModalHeading>{t('m_links')}</ModalHeading>
          <dl className="kv">
            {project.links.map((l) => (
              <div key={l.url} className="contents">
                <dt>{l.label[lang]}</dt>
                <dd>
                  <a className="link" href={l.url} target="_blank" rel="noopener noreferrer">
                    {l.url.replace(/^https?:\/\//, '')} <span aria-hidden="true">↗</span>
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </>
      )}
    </>
  )
}

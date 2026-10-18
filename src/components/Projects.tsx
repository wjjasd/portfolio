import { getLocale, getTranslations } from 'next-intl/server'
import TerminalSection from '@/components/terminal/TerminalSection'
import ToolCallHeader from '@/components/terminal/ToolCallHeader'
import DiffBlock from '@/components/terminal/DiffBlock'
import Glyph, { type GlyphName } from '@/components/terminal/Glyph'
import { CMD, TOOL } from '@/components/terminal/commands'
import ProjectDialog from '@/components/ProjectDialog'
import { projects, type Project, type ProjectStatus, type DiffMetric } from '@/data/projects'

const STATUS: Record<ProjectStatus, { glyph: GlyphName; tone: string }> = {
  live: { glyph: 'bullet', tone: 'text-success' },
  internal: { glyph: 'bullet', tone: 'text-success' },
  delivered: { glyph: 'check', tone: 'text-fg-muted' },
  released: { glyph: 'check', tone: 'text-fg-muted' },
  ended: { glyph: 'bullet-hollow', tone: 'text-fg-dim' },
  here: { glyph: 'target', tone: 'text-accent' },
}

type T = Awaited<ReturnType<typeof getTranslations>>
type Lang = 'ko' | 'en'

function diffText(m: DiffMetric[], key: 'before' | 'after', short: boolean) {
  return m.map((x, i) => (
    <span key={x.label}>
      {i > 0 && ' · '}
      {short ? (x.short ?? x.label) : x.label} <b>{x[key]}</b>
    </span>
  ))
}

function mediaSummary(p: Project) {
  const images = p.gallery.filter((g) => g.type === 'image').length
  const videos = p.gallery.length - images
  return { images, videos }
}

function meta(project: Project, lang: Lang, t: T) {
  const data = project[lang]
  return [project.period, data.org, t('contribution', { n: project.contribution }), data.tag].filter(Boolean).join(' · ')
}

interface SrLabels {
  diff: { before: string; after: string }
}

function ProjectCard({ project, lang, t, srLabels }: { project: Project; lang: Lang; t: T; srLabels: SrLabels }) {
  const data = project[lang]
  const status = STATUS[project.status]
  const { images, videos } = mediaSummary(project)
  const summary = `${project.gallery.length} media · ${project.links.length} links`

  return (
    <article className="card" id={`p-${project.slug}`}>
      <div className="card-head">
        <span className="dir">{project.slug}/</span>
        <span className="status">
          <span className={status.tone}>
            <Glyph name={status.glyph} />
          </span>{' '}
          {t(`status_${project.status}`)}
        </span>
      </div>
      <h3>{data.name}</h3>
      <p className="meta">{meta(project, lang, t)}</p>
      {data.kpis && (
        <div className="kpis">
          {data.kpis.map((k) => (
            <p key={k.label} className="kpi">
              <b>{k.value}</b>
              <span>{k.label}</span>
            </p>
          ))}
        </div>
      )}
      {data.diff && (
        <DiffBlock
          before={[diffText(data.diff.slice(0, 2), 'before', true)]}
          after={[diffText(data.diff.slice(0, 2), 'after', true)]}
          srLabels={srLabels.diff}
          label={t('diff_label')}
        />
      )}
      {data.oneLiner && <p className="one">{data.oneLiner}</p>}
      <ul className="hl">
        {data.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
      <ul className="tags" aria-label={t('tags_label')}>
        {project.techStack.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <div className="card-foot">
        <ProjectDialog
          slug={project.slug}
          labelledBy={`p-${project.slug}-title`}
          triggerClassName="btn-open"
          trigger={
            <>
              {t('open')}
              <span className="sr-only">: {data.name}</span> <span className="k" aria-hidden="true">↵</span>
            </>
          }
          head={
            <div className="m-head">
              <ToolCallHeader tool={TOOL.read} args={`${project.slug}.md`} summary={summary} className="tc tc-read" />
              <form method="dialog">
                <button type="submit" className="m-close" aria-label={t('close')}>
                  <span aria-hidden="true">esc ✕</span>
                </button>
              </form>
            </div>
          }
          title={
            <>
              <h3 id={`p-${project.slug}-title`}>{data.name}</h3>
              <p className="m-meta">{meta(project, lang, t)}</p>
            </>
          }
        />
        {project.links.length > 0
          ? project.links.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
                {link.label[lang]} <span aria-hidden="true">↗</span>
              </a>
            ))
          : project.gallery.length > 0 && <span className="text-fg-dim">{t('media_count', { images, videos })}</span>}
      </div>
    </article>
  )
}

export default async function Projects() {
  const t = await getTranslations('projects')
  const tTerm = await getTranslations('terminal')
  const lang: Lang = (await getLocale()) === 'ko' ? 'ko' : 'en'
  const srLabels: SrLabels = {
    diff: { before: tTerm('diff_before'), after: tTerm('diff_after') },
  }

  return (
    <TerminalSection id="projects" cmd={CMD.projects} title={t('title')}>
      <div className="out">
        <p className="ls-line" aria-hidden="true">
          total {projects.length}
        </p>
        <nav aria-label={t('index_label')}>
          <ul className="ls-index">
            {projects.map((p) => (
              <li key={p.slug}>
                <a href={`#p-${p.slug}`}>{p.slug}/</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="cards">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} lang={lang} t={t} srLabels={srLabels} />
          ))}
        </div>
      </div>
    </TerminalSection>
  )
}

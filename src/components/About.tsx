import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import TerminalSection from '@/components/terminal/TerminalSection'
import ImageDialog from '@/components/ImageDialog'
import { CMD } from '@/components/terminal/commands'

// 키 라벨은 ~/.profile 키 이름이라 번역하지 않는다 (ADR ④)
const PROFILE_KEYS = ['name', 'role', 'cert', 'focus'] as const
const PARAGRAPHS = ['p1', 'p2', 'p3', 'p4'] as const

export default async function About() {
  const t = await getTranslations('about')

  return (
    <TerminalSection id="about" cmd={CMD.about} title={t('title')}>
      <div className="out profile">
        <div>
          <ImageDialog
            src="/profile.jpg"
            alt={t('profile_caption')}
            width={420}
            height={525}
            caption={t('profile_caption')}
            closeLabel={t('close')}
            triggerLabel={t('profile_zoom')}
            triggerClassName="avatar"
            dialogClassName="max-w-[420px]"
          >
            <Image
              src="/profile.jpg"
              alt=""
              width={168}
              height={168}
              className="h-full w-full object-cover"
            />
          </ImageDialog>
        </div>
        <div className="about-body">
          <dl className="kv">
            {PROFILE_KEYS.map((key) => (
              <div key={key} className="contents">
                <dt>{key}</dt>
                <dd>{t(key)}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6">
            {PARAGRAPHS.map((key, i) => (
              <p key={key} className={i === 0 ? 'lead' : undefined}>
                {t(key)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </TerminalSection>
  )
}

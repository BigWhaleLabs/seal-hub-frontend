import { ComponentChildren } from 'preact'
import { SectionTitle } from 'components/Common/Text'
import ChildrenProp from 'models/ChildrenProp'
import classnames, { display, flexDirection, gap } from 'classnames/tailwind'

const sectionWrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-2')
)

export default function ({
  children,
  title,
}: ChildrenProp & { title?: ComponentChildren }) {
  return (
    <section className={sectionWrapper}>
      {!!title && <SectionTitle>{title}</SectionTitle>}
      {children}
    </section>
  )
}

import "../styles/section-title.css"

interface SectionTitleProps {
  title: string
  subtitle?: string
  alignment?: "left" | "center" | "right"
}

const SectionTitle = ({ title, subtitle, alignment = "center" }: SectionTitleProps) => {
  return (
    <div className={`section-title ${alignment}`}>
      <h2 className="section-title-heading">{title}</h2>
      {subtitle && <p className="section-title-subtitle">{subtitle}</p>}
    </div>
  )
}

export default SectionTitle

import "@/app/styles/section-title.css";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  background?: string;
}

export default function SectionTitle({background, title, subtitle}: SectionTitleProps) {
  return (
    <div className={'section-title'}>
      {background && <div className={'section-title-background'}>{background}</div>}

      <h2 className={'title-2 section-title-title'}>{title}</h2>

      {subtitle && <h3 className={'subtitle-2 section-title-subtitle'}>{subtitle}</h3>}
    </div>
  );
}
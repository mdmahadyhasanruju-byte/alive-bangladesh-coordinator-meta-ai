import { V2_CSS } from './v2-css';

const OVERRIDES = `
.break-all{word-break:normal;overflow-wrap:anywhere}
.manifest-url{word-break:normal;overflow-wrap:anywhere;text-wrap:pretty}
header a[href="https://alive-bangladesh-coordinator-meta-a.vercel.app"]{white-space:nowrap}
@media (min-width:1024px){footer .border-t{padding-bottom:6rem}}
@media (min-width:1024px){.pitch-tubewell-cap{padding-bottom:5.5rem}}
@media (max-width:430px){.pitch-brand-sub{display:none}}
`;

export function V2Styles() {
  return <style dangerouslySetInnerHTML={{ __html: V2_CSS + OVERRIDES }} />;
}

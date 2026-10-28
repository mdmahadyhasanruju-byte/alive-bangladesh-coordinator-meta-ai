import type { Metadata } from 'next';
import { V2Styles } from '@/components/v2-styles';
import { PITCH_HTML } from './v2-markup';

export const metadata: Metadata = {
  title: 'aLive Bangladesh — Premium Pack v2 | meUus',
  description:
    'Evidence-linked community coordination for Bangladesh. Human approval, Bangla · English · Arabic, 34 pages, film and proof pack — meUus Connecting Everything.',
};

export default function PitchPage() {
  return (
    <>
      <V2Styles />
      <div dangerouslySetInnerHTML={{ __html: PITCH_HTML }} />
    </>
  );
}

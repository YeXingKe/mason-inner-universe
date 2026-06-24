import { useLayoutConfig } from '@/contexts/LayoutConfigContext'
import DefaultLayout from '@/layouts/DefaultLayout'
import StreamlineLayout from '@/layouts/StreamlineLayout'

export default function AppLayout() {
  const { layoutMode } = useLayoutConfig()

  if (layoutMode === 'streamline') {
    return <StreamlineLayout />
  }

  return <DefaultLayout />
}

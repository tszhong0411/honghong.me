import { SegmentGroup, SegmentGroupItem } from '@tszhong0411/ui'

const frameworks = [
  { label: 'React', value: 'react' },
  { label: 'Solid', value: 'solid' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Vue', value: 'vue' }
]

const SegmentGroupVerticalDemo = () => {
  return (
    <SegmentGroup orientation='vertical' defaultValue='react'>
      {frameworks.map((framework) => (
        <SegmentGroupItem key={framework.value} value={framework.value}>
          {framework.label}
        </SegmentGroupItem>
      ))}
    </SegmentGroup>
  )
}

export default SegmentGroupVerticalDemo

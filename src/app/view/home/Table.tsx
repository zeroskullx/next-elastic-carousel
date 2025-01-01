import data from '@/app/data/carouselProps.json'

export function CarouselPropsTable() {
  return (
    <table
      style={{
        borderCollapse: 'collapse',
        width: '100%',
        border: '1px solid #ddd',
      }}
    >
      <thead>
        <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left' }}>
          <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
            Name
          </th>
          <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
            Type
          </th>
          <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
            Default
          </th>
          <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
            Description
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((prop, index) => (
          <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
            <td style={{ padding: '10px' }}>{prop.name}</td>
            <td style={{ padding: '10px' }}>{prop.type}</td>
            <td style={{ padding: '10px' }}>{prop.default}</td>
            <td style={{ padding: '10px' }}>{prop.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

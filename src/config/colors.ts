type Color = {
  name: string
  className: string
  variable: string
  hex: {
    light: string
    dark: string
  }
}

export const colors: Color[] = [
  {
    name: 'Background',
    className: 'bg-hong-bg',
    variable: 'var(--hong-fg)',
    hex: {
      light: '#fff',
      dark: '#000',
    },
  },
  {
    name: 'Accent 1',
    className: 'bg-accent-1',
    variable: 'var(--accent-1)',
    hex: {
      light: '#fafafa',
      dark: '#111',
    },
  },
  {
    name: 'Accent 2',
    className: 'bg-accent-2',
    variable: 'var(--accent-2)',
    hex: {
      light: '#eaeaea',
      dark: '#333',
    },
  },
  {
    name: 'Accent 3',
    className: 'bg-accent-3',
    variable: 'var(--accent-3)',
    hex: {
      light: '#999',
      dark: '#444',
    },
  },
  {
    name: 'Accent 4',
    className: 'bg-accent-4',
    variable: 'var(--accent-4)',
    hex: {
      light: '#888',
      dark: '#666',
    },
  },
  {
    name: 'Accent 5',
    className: 'bg-accent-5',
    variable: 'var(--accent-5)',
    hex: {
      light: '#666',
      dark: '#888',
    },
  },
  {
    name: 'Accent 6',
    className: 'bg-accent-6',
    variable: 'var(--accent-6)',
    hex: {
      light: '#444',
      dark: '#999',
    },
  },
  {
    name: 'Accent 7',
    className: 'bg-accent-7',
    variable: 'var(--accent-7)',
    hex: {
      light: '#333',
      dark: '#eaeaea',
    },
  },
  {
    name: 'Accent 8',
    className: 'bg-accent-8',
    variable: 'var(--accent-8)',
    hex: {
      light: '#111',
      dark: '#fafafa',
    },
  },
  {
    name: 'Foreground',
    className: 'bg-hong-fg',
    variable: 'var(--hong-bg)',
    hex: {
      light: '#fff',
      dark: '#000',
    },
  },
]

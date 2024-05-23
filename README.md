# Next Elastic Carousel

Next Elastic Carousel uses the base of [`react-elastic-carousel`](https://sag1v.github.io/react-elastic-carousel/), where we fixed some known bugs, updated libraries, and added new features. Our goal is to provide a more stable and reliable carousel component for React applications.

## Features

- **Improved versioning**: Ensuring consistent and predictable updates.
- **Bug fixes**: Addressing known issues from the original repository.
- **New name**: As the name has been changed to Next Elastic Carousel, it is not compatible with the original React Elastic Carousel, as significant changes have been made to the codebase.

Feel free to contribute by opening issues or submitting pull requests!

## Why do we need yet another carousel component

- **Element resize support (true responsiveness)**
  Most of the carousel components are responsive to the viewport size, but this is not a real responsive support as we can have an element with a `width:500px` on a `1200px` screen, most carousel component will "think" we are on a `1200px` mode because they "watch" the view-port's size and not the wrapping element's size.
  This is the reason why `react-eleastic-carousel` is using the [resize-observer](https://developers.google.com/web/updates/2016/10/resizeobserver) which gives us a true responsive support, not matter on what screen size we are.

- **RTL (right-to-left) support**
  Supporting right-to-left languages requires a full support for right-to-left rendering and animations which is not supported in most of the carousel components out there. also, right-to-left support is [important and should be a standard for most applications](https://www.youtube.com/watch?v=A_3BfONFRUc).

## Install

```bash
npm i next-elastic-carousel
```

or

```bash
yarn add next-elastic-carousel
```

or

```bash
pnpm add next-elastic-carousel
```

`next-elastic-carousel` is using the latest version of [styled-components](https://github.com/styled-components/styled-components) for styling. This means that you might need to install it as well:

```bash
npm i styled-components
```

## Usage

Note: All tests were conducted on the client side using Next.js 14+. If you have evidence that it works with other versions of React or Next.js, feel free to modify this README.

```jsx
'use client'

import Carousel from 'next-elastic-carousel'

export default function PageCarousel() {
  const items = [
    { id: 1, title: 'item #1' },
    { id: 2, title: 'item #2' },
    { id: 3, title: 'item #3' },
    { id: 4, title: 'item #4' },
    { id: 5, title: 'item #5' },
  ]

  return (
    <Carousel isRTL={false}>
      {items.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </Carousel>
  )
}
```

# credit

All credit goes to [Sagiv Ben Giat](https://github.com/sag1v) and the contributors of [react-elastic-carousel](https://github.com/sag1v/react-elastic-carousel).

## License

MIT © [zeroskullx](https://github.com/zeroskullx)

const playgroundIntro = {
    steps: [
      {
        element: '#step1',
        intro: `
      <p>Watch this YouTube video!</p>
      <iframe 
        width="100%" 
        height="100%" 
        src="https://www.youtube.com/embed/kiyi-C7NQrQ?si=cVc-xTHf-r0HUpkM" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    `,
        tooltipClass: 'customTooltip'
      },
      {
        element: '#step2',
        intro: 'This is the second step!',
      },
      {
        element: '#step3',
        intro: 'Here is the last step!',
      },
    ],
  }

export default playgroundIntro;


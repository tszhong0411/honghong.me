interface Props {
  id: string
}

const CustomIframe = ({ id }: Props) => {
  return (
    <div className="relative h-0 w-full pb-[56.25%]">
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        className="absolute top-0 left-0 h-full w-full"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default CustomIframe

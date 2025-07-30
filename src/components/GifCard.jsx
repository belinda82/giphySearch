function GifCard({ gif }) {
  const handleClick = () => {
    navigator.clipboard
      .writeText(gif.url)
      .then(() => alert("GIF URL copied!"))
      .catch(() => alert("Failed to copy"));
  };

  return (
    <div
      className="cursor-pointer border rounded overflow-hidden shadow hover:shadow-lg transition"
      onClick={handleClick}
    >
      <img
        src={gif.images.fixed_height.url}
        alt={gif.title}
        className="w-full h-auto"
      />
    </div>
  );
}

export default GifCard;

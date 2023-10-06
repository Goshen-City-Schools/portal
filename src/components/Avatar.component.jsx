const Avatar = ({ imageUrl, altText, width = 40, height = 40, className }) => {
  return (
    <div
      className={`relative rounded-full ${className}`}
      style={{ width, height }}
    >
      <img
        src={imageUrl}
        alt={altText}
        layout="fill"
        objectFit="cover"
        className="rounded-full"
      />
    </div>
  );
};

export default Avatar;

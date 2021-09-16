import { Image } from 'react-bootstrap';

export default function Icon(props) {
  return (
    <div>
      <a href="/">
        <Image
          rounded
          src={props.src}
          width={props.width}
          height={props.height}
          alt=""
        />
      </a>
    </div>
  );
}

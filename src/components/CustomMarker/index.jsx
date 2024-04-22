
import Rectangle from '../Rectangle';
import styles from './index.module.scss'

const CustomMarker = ({ imageUrl, name, lat, lng }) => {

  const onMarkerClick = () => {
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(directionsUrl, '_blank');
  };

  return (
    <div
      onClick={onMarkerClick}

      id={styles.mapMark}>
      <img src={imageUrl}
        onClick={onMarkerClick}
        alt={name}
      />

      <div className={styles.arrow_container}>
        <Rectangle />
      </div>
    </div>
  );
};

export default CustomMarker;
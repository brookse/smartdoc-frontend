import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { User } from './api';

interface UsersMapProps {
  users: User[];
  onMarkerClick: (user: User) => void;
}

const key = 'AIzaSyD161yRRLHNUAQqxAyOw9e3Y_YVEA9Y6oM';

export const UsersMap = ({ users, onMarkerClick }: UsersMapProps) => {  
  const center = { lat: 39.8097343, lng: -98.5556199 };
  const zoom = 4;
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: key,
  })

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={{ height: '400px', width: '100%' }} 
      center={center}
      zoom={zoom}
    >
      {users.map((user) => (
        <Marker key={user._id} position={{lat: user.latitude!, lng: user.longitude!}} onClick={() => onMarkerClick(user)}/>
      ))}
    </GoogleMap>
  ) : (
    <div>Loading map</div>
  )
};
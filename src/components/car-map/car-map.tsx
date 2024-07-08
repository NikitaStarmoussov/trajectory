import { TileLayer, Marker, Popup } from "react-leaflet";
import { MapContainer } from "react-leaflet";
import { Modal } from "../modal/modal";
import { useState } from "react";

type CarMapProps = {
  center: { lat: number; lng: number };
};

export const CarMap: React.FC<CarMapProps> = ({ center }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Map</button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
          {/* <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    /> */}
          <TileLayer
            attribution="Google Maps"
            url="http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" // regular
            // url="http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}" // satellite
            // url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}" // terrain
            maxZoom={20}
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
          />
          <Marker position={center}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
        ,
      </Modal>
    </>
  );
};

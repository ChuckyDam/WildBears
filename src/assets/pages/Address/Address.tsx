import { useContext } from 'react'
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import "./Address.scss"
import context from "../../contexts/ContextsMoney";

type Props = {}

export default function Address({}: Props) {

  const obj = useContext<any>(context);
  const [setAddress] = [obj.setAddress];

  return (
    <div className='Address'>
      <YMaps>
        <div>
          <Map 
          defaultState={{ center: [55.14256, 61.444566], zoom: 15, controls: ["zoomControl", "fullscreenControl"],}} 
          style={{width: "100%", height: "500px"}}
          modules={["control.ZoomControl", "control.FullscreenControl"]}
          >

            <Placemark 
            instanceRef={ref => { ref && ref.events.add('balloonopen', () => { setAddress('Гагарина 7'); }); }} 
            modules={["geoObject.addon.balloon"]}
            geometry={[55.14256, 61.444566]} 
            properties={{
              balloonContentBody:
                `Вы выбрали: Гагарина 7`,
            }}
            />
            <Placemark 
            instanceRef={ref => { ref && ref.events.add('balloonopen', () => { setAddress('Станкомаш'); }); }} 
            modules={["geoObject.addon.balloon"]}
            geometry={[55.144095, 61.439611]} 
            properties={{
              balloonContentBody:
                `Вы выбрали: Станкомаш`,
            }}
            />
            <Placemark 
            instanceRef={ref => { ref && ref.events.add('balloonopen', () => { setAddress('ТРК Алмаз'); }); }} 
            modules={["geoObject.addon.balloon"]}
            geometry={[55.144618, 61.451035]} 
            properties={{
              balloonContentBody:
                `Вы выбрали: ТРК Алмаз`,
            }}
            />
          </Map>
        </div>
      </YMaps>
    </div>
  );
}
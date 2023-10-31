import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Container } from './styles';
import useWindowDimensions from '../../utils/WindowDimensions';

function Banners() {
  const { width } = useWindowDimensions();
  const isMobile = width <= 767;

  return (
    <Container>
      <Carousel
        showArrows={!isMobile}
        showStatus={false}
        showThumbs={false}
        swipeable={true}
        showIndicators={!isMobile}
        emulateTouch={true}
        infiniteLoop
        autoPlay
      >
        <div>
          <img
            src={'https://images.tcdn.com.br/img/img_prod/1088166/607e086f_banner_lista_3.png?166188eaa684979d4fe453'}
            title='Lista de Casamento'
            alt='Lista de Casamento'
          />
        </div>
        <div>
          <img
            src={'https://images.tcdn.com.br/img/img_prod/1088166/700908f9_banner_lista_7.png?1bf66a3690ceba5cf3b441'}
            title='Lista de Chá de Cozinha'
            alt='Lista de Chá de Cozinha'
          />
        </div>
        <div>
          <img
            src={'https://images.tcdn.com.br/img/img_prod/1088166/5e53082d_banner_lista_5.png?0bdc7165cf2e8b25301d05'}
            title='Lista de Chá de Casa Nova'
            alt='Lista de Chá de Casa Nova'
          />
        </div>
        <div>
          <img
            src={'https://images.tcdn.com.br/img/img_prod/1088166/4ffc07a1_banner_lista_1.png?25eb17015c6fcfdaead689'}
            title='Lista de Desejos'
            alt='Lista de Desejos'
          />
        </div>
      </Carousel>
    </Container>
  );
}

export default Banners;

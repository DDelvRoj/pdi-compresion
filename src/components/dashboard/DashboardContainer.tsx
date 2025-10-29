import { IonButton, IonCol, IonGrid, IonInput, IonLabel, IonLoading, IonRow, IonTitle } from '@ionic/react';
import { useState } from 'react';
import "../Container.css"

const url = process.env.VITE_IMG_PROXY_URL ?? "";

const Dashboard: React.FC = () => {
    const [data, setData] = useState({
        link: "",
        nivel_compresion: 5
    });

    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    // Nuevo estado para guardar las dimensiones
    const [imageDims, setImageDims] = useState({ width: 0, height: 0 });

    const originalLink = data.link;
    const compressedLink = `${url}q:${data.nivel_compresion}/plain/${data.link}`;

    // Función para obtener las dimensiones de la imagen cargada
    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const img = event.currentTarget;
        setImageDims({
            width: img.naturalWidth,
            height: img.naturalHeight,
        });
    };

    const handleAnalyze = () => {
        setShow(true);
        setImageDims({ width: 0, height: 0 }); // Resetear dimensiones
    }

    // El cálculo del PSNR solo se hace si tenemos las dimensiones
    const canCalculatePsnr = imageDims.width > 0 && imageDims.height > 0;

    return (
        <div className="container">
            <div>
                <IonGrid>

                    <IonRow >
                        <IonTitle><h2>Ingrese los datos</h2></IonTitle>
                    </IonRow>
                    <IonRow>
                        <IonCol size="6" sizeXs='12' sizeXl='6'>
                            <IonInput className='input' label='Link' placeholder='Ingrese el link de la imagen' autoFocus
                                onIonChange={(e) => setData({ ...data, link: e.detail.value ?? "" })} />
                        </IonCol>
                        <IonCol size="6" sizeXs='12' sizeXl='6'>
                            <IonInput type='number' className='input' label='Compresion (5-100)' max={100} min={5}
                                onIonChange={(e) => setData({ ...data, nivel_compresion: parseInt(e.detail.value ?? "0", 10) })} />
                        </IonCol>
                    </IonRow>

                </IonGrid>
            </div>
            <IonButton
                onClick={handleAnalyze}
                disabled={!data.link || data.nivel_compresion < 5 || data.nivel_compresion > 100}
            >
                Analizar
            </IonButton>

            {!loading && show && data.link && data.nivel_compresion && (
                <IonGrid>
                    <IonRow>
                        <IonCol size="6" sizeXs='12' sizeXl='6'>
                            <img
                                src={originalLink}
                                onLoad={handleImageLoad}
                                style={{ maxWidth: '100%', maxHeight: '300px', margin: '10px' }}
                                alt="Original"
                            />
                        </IonCol>
                        <IonCol size="6" sizeXs='12' sizeXl='6'>
                            <img
                                src={compressedLink}
                                style={{ maxWidth: '100%', maxHeight: '300px', margin: '10px' }}
                                alt="Comprimida"
                            />
                        </IonCol>
                    </IonRow>



                    {!canCalculatePsnr && (
                        <IonLabel color="medium">Cargando imágenes para calcular PSNR...</IonLabel>
                    )}
                    {canCalculatePsnr && (
                        <IonLabel color="medium">{imageDims.width}x{imageDims.height}</IonLabel>
                    )}
                </IonGrid>
            )}

            {loading && (<IonLoading animated />)}
        </div>
    );
};

export default Dashboard;
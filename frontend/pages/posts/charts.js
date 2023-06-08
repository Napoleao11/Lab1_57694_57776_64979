import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/layout';
import { useEffect, useRef, useState, useContext, createContext } from 'react';
import { getDatabase, ref, onValue} from "firebase/database";
import LineChart from '../../components/line-chart';
import app from '../../components/firebase';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router'

var firstTimestamp = 0;
var timeRound = 0;
var timeRoundDecimal = 0
var pointRad = 0;

var xLimit = -9;
var yLimit = 1.7;
var zLimit = 2.3;

var timeRoundAlerta = 0;

const database = getDatabase();
const dataRef = ref(database, '/accel');
var xAlertArray = [];
var yAlertArray = [];
var zAlertArray = [];


export default function Charts() {
    const [openX, setOpenX] = useState(true);
    const [openY, setOpenY] = useState(true);
    const [openZ, setOpenZ] = useState(true);

    const router = useRouter();

    const [data, setData] = useState(null);
    const [xCoord, setX] = useState(null);
    const [yCoord, setY] = useState(null);
    const [zCoord, setZ] = useState(null);
    const [times, setTime] = useState(null);
    const [inputValue, setInputValue] = useState(null);

    if (inputValue < 50 && inputValue > 0) {
        pointRad = 3 - 1.5 * inputValue / 50
    } else {
        pointRad = 0
    }
    
    useEffect(() => {
        return onValue(dataRef, (snapshot) => {
            setData(snapshot.val())
            
        });     
    }, []);

    useEffect(() => {
        if (!sessionStorage.getItem("isLoggedIn")){
            router.push('/');
            return;
        }   
    });
    
    useEffect(() => {

        if(firstTimestamp == 0){
            var xCoordArray = [];
            var yCoordArray = [];
            var zCoordArray = [];
            var timestampArray = [];
            for (var key in data) {
                if(!data[key].timestamp || !data[key].x || !data[key].y || !data[key].z) { continue; }

                //ALERTAS
                if(data[key].x > xLimit){
                    timeRoundAlerta=data[key].timestamp-firstTimestamp
                    timeRoundAlerta = timeRoundAlerta.toFixed(2)
                    xAlertArray.push(timeRoundAlerta)
                }
                if(data[key].y > yLimit){
                    timeRoundAlerta=data[key].timestamp-firstTimestamp
                    timeRoundAlerta = timeRoundAlerta.toFixed(2)
                    yAlertArray.push(timeRoundAlerta)
                }
                if(data[key].z > zLimit){
                    timeRoundAlerta=data[key].timestamp-firstTimestamp
                    timeRoundAlerta = timeRoundAlerta.toFixed(2)
                    zAlertArray.push(timeRoundAlerta)
                }


                if(firstTimestamp == 0){
                    firstTimestamp = data[key].timestamp
                }
                
                timeRound=data[key].timestamp-firstTimestamp
                timeRoundDecimal = timeRound.toFixed(2)

                timestampArray.push(timeRoundDecimal)
                xCoordArray.push(data[key].x)
                yCoordArray.push(data[key].y)
                zCoordArray.push(data[key].z)
            }
        }        
        else {
            const keys = Object.keys(data);
            const lastKey = keys[keys.length - 1];
            
            var xCoordArray = xCoord;
            var yCoordArray = yCoord;
            var zCoordArray = zCoord;
            var timestampArray = times;
            
            //ALERTAS
            if(data[lastKey].x > xLimit){
                timeRoundAlerta=data[lastKey].timestamp-firstTimestamp
                timeRoundAlerta = timeRoundAlerta.toFixed(2)
                xAlertArray.push(timeRoundAlerta)
            }
            if(data[lastKey].y > yLimit){
                timeRoundAlerta=data[lastKey].timestamp-firstTimestamp
                timeRoundAlerta = timeRoundAlerta.toFixed(2)
                yAlertArray.push(timeRoundAlerta)
            }
            if(data[lastKey].z > zLimit){
                timeRoundAlerta=data[lastKey].timestamp-firstTimestamp
                timeRoundAlerta = timeRoundAlerta.toFixed(2)
                zAlertArray.push(timeRoundAlerta)
            }

            timeRound=data[lastKey].timestamp-firstTimestamp
            timeRoundDecimal = timeRound.toFixed(2)
            timestampArray.push(timeRoundDecimal)
            xCoordArray.push(data[lastKey].x)
            yCoordArray.push(data[lastKey].y)
            zCoordArray.push(data[lastKey].z)
        }

        setTime(timestampArray)
        setX(xCoordArray)
        setY(yCoordArray)
        setZ(zCoordArray)

    }, [data])
    
    return (
        <Layout>
            <div align="center">
                <a href="/posts/charts">
                    <Button variant="contained">Charts</Button>
                </a>
                <a href="/posts/table">
                    <Button variant="outlined">Table</Button>
                </a>
            </div>

            
            <div>Inserir número de amostras pretendido:</div>
            <input type="text" value={inputValue !== null ? inputValue : undefined} onChange={(e) => setInputValue(e.target.value)} />
            <div>(mostra todos por default)</div>


            {times ? (
                <>
                    <LineChart labels={times.slice(-inputValue)} data={xCoord.slice(-inputValue)} 
                                label='Graph Accel X'
                                borderColor='rgb(75, 192, 192)' 
                                pointBorderColor = 'rgb(75, 192, 192)' 
                                pointBackgroundColor = 'rgb(75, 192, 192)'
                                backgroundColor = 'rgba(75, 192, 192, 0.5)'
                                pointRadius = {pointRad}
                                />
                    <LineChart labels={times.slice(-inputValue)} data={yCoord.slice(-inputValue)} 
                                label='Graph Accel Y'
                                borderColor= 'rgb(150, 25, 192)' 
                                pointBorderColor = 'rgb(150, 25, 192)' 
                                pointBackgroundColor = 'rgb(150, 25, 192)'
                                backgroundColor = 'rgba(150, 25, 192, 0.5)'
                                pointRadius = {pointRad}
                                />
                                
                    <LineChart labels={times.slice(-inputValue)} data={zCoord.slice(-inputValue)} 
                                label='Graph Accel Z'
                                borderColor= 'rgb(250, 100, 25)' 
                                pointBorderColor = 'rgb(250, 100, 25)' 
                                pointBackgroundColor = 'rgb(250, 100, 25)'
                                backgroundColor = 'rgba(250, 100, 25, 0.5)'
                                pointRadius = {pointRad}
                                />
                                <div>
            <Collapse in={openX}>
                <Alert onClose={() => {setOpenX(false)}} severity="warning" type="x">
                <AlertTitle>Warning</AlertTitle>
                    Unusual value of X at timestamps
                    <p/><strong>{JSON.stringify(xAlertArray)} </strong>
                    <p/>Threshold considered: X {'>'} {xLimit}
                </Alert>
            </Collapse>
            
            <Collapse in={openY}>
                <Alert onClose={() => {setOpenY(false)}} severity="warning" type="x">
                <AlertTitle>Warning</AlertTitle>
                    Unusual value of Y at timestamps 
                    <p/><strong>{JSON.stringify(yAlertArray)} </strong>
                    <p/>Threshold considered: Y {'>'} {yLimit}
                </Alert>
            </Collapse>

            <Collapse in={openZ}>
                <Alert onClose={() => {setOpenZ(false)}} severity="warning" type="x">
                <AlertTitle>Warning</AlertTitle>
                    Unusual value of Z at timestamps 
                    <p/><strong>{JSON.stringify(zAlertArray)} </strong>
                    <p/>Threshold considered: Z {'>'} {zLimit}
                </Alert>
            </Collapse>
            </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
            <Head>
                <title>First Post</title>
                <link rel="icon" href="/images/logo_nova.png" />
            </Head>
        </Layout>
        
    );
    

}
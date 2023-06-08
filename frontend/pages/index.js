import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { x } from '../lib/posts';



export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      
      <h1>Coppelia Dashboard</h1>
      
      <p align="justify">Este domínio consiste numa dashboard implementada no âmbito do LAB1 de ISCF.
        Esta dashboard recolhe dados da nossa base de dados, na plataforma Firebase.
        Os dados desta base de dados são extraidos de uma simulação feita no Software CoppeliaSim, através de uma Restful API, implementada através de Flask.
      </p>

      <div align="center">
          <Image
              priority
              src="/images/simulacao.png"
              alt="Loading image..."
              width={500}
              height={300}
            />
            <p align="center" style={{fontSize: 12}}>Print da simulação da qual se está a extrair os dados</p>
      </div>
      

      <b align="justify" style={{fontSize: 25}}>Funcionalidades Implementadas:</b>
      <p align="justify" style={ {marginTop: 0}}>   -Extração dos dados da simulação no CoppeliaSim para a base de dados na plataforma Firebase.</p>
      <p align="justify" style={ {marginTop: -15}}>   -Integração com uma aplicação web - a dashboard.</p>
      <p align="justify" style={ {marginTop: -15}}>   -Repositório no Github e deployment na plataforma Vercel.</p>
      <p align="justify" style={ {marginTop: -15}}>   -Dashboard com charts/tables configuráveis.</p>
      <p align="justify" style={ {marginTop: -15}}>   -Autenticação na aplicação.</p>
      <p align="justify" style={ {marginTop: -15}}>   -Alarmes quando os sensores lêem valores acima de certos thresholds.</p>
      <p align="justify"></p>
      <p align="justify"> Nota: uma vez que para recolher informação da Firebase utilizámos um listener [onValue()] em 
      vez de tentar ciclicamente [setInterval()], não fazia sentido implementarmos um input para alterar este intervalo de tempo. Assim sendo, implementámos outro input: escolher
      o número de dados que os gráficos mostram.
      </p>


      <a href="/posts/charts">Open dashboard →</a>
    
    </Layout>
  );
}
import React from 'react';
import { Offline, Online } from 'react-detect-offline';

import logo from '../../images/logo.svg';
import TicketsFilter from '../TicketsFilter';
import Buttons from '../Buttons';
import TicketsList from '../TicketsList';
import LoadingProgress from '../LoadingProgress';
import ErrorMessage from '../ErrorMessage';

import classes from './App.module.scss';

const App = () => {
  const buttons = [
    { name: 'cheapest', label: 'Самый дешевый' },
    { name: 'fastest', label: 'Самый быстрый' },
    { name: 'optimal', label: 'Оптимальный' },
  ];

  return (
    <div className={classes.wrapper}>
      <header className={classes.header}>
        <img src={logo} alt="aviasales" />
      </header>
      <Offline>
        <ErrorMessage message={'Отсутствует интернет соединение'} />
      </Offline>
      <Online>
        <LoadingProgress />
        <main className={classes.main}>
          <aside className={classes['main__sidebar']}>
            <TicketsFilter />
          </aside>
          <section className={classes['main__content']}>
            <Buttons buttons={buttons} />
            <TicketsList />
          </section>
        </main>
      </Online>
    </div>
  );
};

export default App;

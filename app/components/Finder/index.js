import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import filesize from 'filesize';
import styles from './index.css';

class Finder extends Component {
  static propTypes = {
    // increment: PropTypes.func.isRequired,
    // incrementIfOdd: PropTypes.func.isRequired,
    // incrementAsync: PropTypes.func.isRequired,
    // decrement: PropTypes.func.isRequired,
    // counter: PropTypes.number.isRequired
  };

  componentDidMount() {
    this.props.loadRoot();
  }

  render() {
    // const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
    const {loadDetail, showDetail, finder} = this.props;
    const {containers, container, object} = finder;

    const containerListPane = (() => {
      if (!containers.list) {
        return;
      }

      return (
        <section className={styles.pane}>
          <h1 className={styles.headline}>Containers</h1>
          <ul>
            {containers.list.map(item => (
              <li
                className={styles.item}
                onClick={loadDetail.bind(null, item)}>{item.name}</li>
            ))}
          </ul>
        </section>
      );
    })();

    const containerItemPane = (() => {
      if (!container || !container.list) {
        return;
      }

      return (
        <section className={styles.pane}>
          <ul>
            {container.list.map(item => (
              <li
                className={styles.item}
                onClick={showDetail.bind(null, container.current.name, item)}>{item.name}</li>
            ))}
          </ul>
        </section>
      );
    })();

    const objectItemPane = (() => {
      if (!object || !object.item) {
        return;
      }

      return (
        <div className={styles.infoPane}>
          <div className={styles.infoPaneInner}>
            <div>
              <img src={'/private' + object.src} />
            </div>
            <div>
              <dl className={styles.infoData}>
                <dt className={styles.infoTerm}>file name</dt>
                <dd className={styles.infoDesc}>{object.current.name}</dd>
              </dl>
              <dl className={styles.infoData}>
                <dt className={styles.infoTerm}>content type</dt>
                <dd className={styles.infoDesc}>{object.current.content_type}</dd>
              </dl>
              <dl className={styles.infoData}>
                <dt className={styles.infoTerm}>Size</dt>
                <dd className={styles.infoDesc}>{filesize(object.current.bytes)}</dd>
              </dl>
            </div>
          </div>
        </div>
      );
    })();

    return (
      <div className={styles.box}>
        {containerListPane}
        {containerItemPane}
        {objectItemPane}
      </div>
    );
  }
}

export default Finder;

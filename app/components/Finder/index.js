import React, { Component, PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router';
import _ from 'lodash';
import classnames from 'classnames';
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
    const {uploadObject, loadDetail, showDetail, finder} = this.props;
    const {containers, container, object} = finder;

    const handleDrop = (container, files) => {
      uploadObject(container, {
        name: files[0].name,
        path: files[0].path
      });
    };

    const handleClick = e => {
      console.log(e);
      return
    }

    const containerListPane = (() => {
      if (!containers.list) {
        return;
      }

      const currentName = _.get(container, 'current.name');

      return (
        <section className={styles.pane}>
          <h1 className={styles.headline}>Containers</h1>
          <ul>
            {containers.list.map(item => (
              <li
                className={classnames(styles.item, {
                  [styles.itemActive]: currentName === item.name
                })}
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

      const currentName = _.get(object, 'current.name');

      return (
        <section className={styles.pane}>
          <ul>
            {container.list.map(item => (
              <li
                className={classnames(styles.item, {
                  [styles.itemActive]: currentName === item.name
                })}
                onClick={showDetail.bind(null, container.current.name, item)}>{item.name}</li>
            ))}
          </ul>
        </section>
      );
    })();

    const objectItemPane = (() => {
      if (!object || !object.current) {
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
      <Dropzone
        disableClick={true}
        onDrop={handleDrop.bind(null, container)}
        className={styles.box}>
        {containerListPane}
        {containerItemPane}
        {objectItemPane}
      </Dropzone>
    );
  }
}

export default Finder;

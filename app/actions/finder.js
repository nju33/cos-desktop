import os from 'os';
import path from 'path';
import temp from 'temp';
import mkdirp from 'mkdirp';
import _ from 'lodash';
import Conoha from 'conoha';

temp.track();

const user = {
  username: process.env['CONOHA_USERNAME'],
  password: process.env['CONOHA_PASSWORD'],
  tenantId: process.env['CONOHA_TENANT_ID']
};

const conoha = new Conoha(user);
conoha.identity.token.get().then(() => {});

export function uploadObject(container, file) {
  return async dispatch => {
    const _container = conoha.os.container(container.current.name);
    await _container.object(file.name).upload(file.path);
    const data = await _container.get();
    const current = _.find(data.body, _.iteratee({name: file.name}));
    handleLoadDetail(dispatch, container.current);
    handleShowDetail(dispatch, container.current.name, current);
  }
}

export function deleteObject(container, file, currentFile) {
  return async dispatch => {
    const _container = conoha.os.container(container.name);
    await _container.object(file.name).delete();
    const data = await _container.get();
    handleLoadDetail(dispatch, container);
    if (!_.isNil(currentFile)) {
      handleShowDetail(dispatch, container.name, currentFile);
    }
  }
}

export function loadRoot() {
  return dispatch => {
    conoha.identity.token.get().then(() => {
      conoha.os.getStatus().then(data => {
        dispatch({
          type: 'LOAD_ROOT',
          data: {list: data.body}
        });
      });
    });
  };
}

async function handleLoadDetail(dispatch, container) {
  const data = await conoha.os.container(container.name).get();
  dispatch({
    type: 'LOAD_DETAIL',
    data: {
      current: container,
      list: data.body
    }
  });
}

export function loadDetail(container) {
  return dispatch => {
    handleLoadDetail(dispatch, container);
  }
}

async function handleShowDetail(dispatch, containername, object) {
  const data = await conoha.os.container(containername).object(object.name).getStatus();
  const dir = path.join(os.tmpdir(), 'conoha');
  mkdirp(dir, () => {
    const stream = temp.createWriteStream({
      dir: path.join(os.tmpdir(), 'conoha'),
      suffix: (() => {
        const matches = object.content_type.match(/[^/]+$/);
        if (matches !== null)  {
          return `.${matches[0]}`;
        }
        return '';
      })()
    });
    stream.write(data.body);
    stream.end();

    setTimeout(() => {
      dispatch({
        type: 'SHOW_DETAIL',
        data: {
          current: object,
          src: stream.path,
          item: data.body
        }
      });
    }, 50);
  });
}

export function showDetail(containername, object) {
  return dispatch => {
    handleShowDetail(dispatch, containername, object);
  }
}

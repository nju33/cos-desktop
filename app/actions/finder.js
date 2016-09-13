import os from 'os';
import path from 'path';
import temp from 'temp';
import mkdirp from 'mkdirp';
import Conoha from 'conoha';

temp.track();

const user = {
  username: process.env['CONOHA_USERNAME'],
  password: process.env['CONOHA_PASSWORD'],
  tenantId: process.env['CONOHA_TENANT_ID']
};

const conoha = new Conoha(user);
conoha.identity.token.get().then(() => {});

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

export function loadDetail(container) {
  return dispatch => {
    conoha.os.container(container.name).get().then(data => {
      dispatch({
        type: 'LOAD_DETAIL',
        data: {
          current: container,
          list: data.body
        }
      })
    });
  }
}

export function showDetail(containername, object) {
  return dispatch => {
    conoha.os.container(containername).object(object.name).getStatus().then(data => {
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
    });
  }
}

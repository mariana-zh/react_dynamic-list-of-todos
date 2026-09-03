import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  presed: number | null;
  todos: Todo[];
  onClose: () => void;
};

export const TodoModal: React.FC<Props> = ({ presed, todos, onClose }) => {
  const [nreUser, setNreUser] = useState<User | null>(null);
  const [load, setLoad] = useState(true);
  const findUser = todos.find(user => user.id === presed);

  useEffect(() => {
    if (typeof presed === 'number' && findUser) {
      setLoad(true);
      getUser(findUser.userId).then(user => {
        setNreUser(user);
        setLoad(false);
      });
    }
  }, [findUser, presed]);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {load ? (
        <Loader />
      ) : (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${findUser?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={onClose}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">
              {findUser?.title}
            </p>

            <p className="block" data-cy="modal-user">
              {/* <strong className="has-text-success">Done</strong> */}
              <strong className="has-text-danger">
                {findUser?.completed ? 'Done' : 'Planned'}
              </strong>

              {' by '}

              <a href={`mailto:${nreUser?.email}`}>{nreUser?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

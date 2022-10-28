import React, { useEffect } from 'react';

import { useActions, useAppSelector } from '../hooks/hooks';
import { tagsActions } from '../store';
import { ReturnComponentType } from '../types';

import style from './SideBar.module.scss';

export const SideBar = (): ReturnComponentType => {
  const { tags } = useAppSelector(state => state.tags);
  const { status } = useAppSelector(state => state.app);
  const { fetchTagsTC } = useActions(tagsActions);
  const tagsForRender = tags.map((tag, index) => {
    // eslint-disable-next-line react/no-array-index-key
    return <span key={index}>{tag}</span>;
  });

  useEffect(() => {
    fetchTagsTC();
  }, [fetchTagsTC]);

  if (status === 'loading') {
    return (
      <div className={style.sidebar}>
        <p>Popular Tags</p>
        <div className="ng-hide">Loading tags...</div>
      </div>
    );
  }
  if (tags) {
    return (
      <div className={style.sidebar}>
        <p>Popular Tags</p>
        <div className={style.tagList}>{tagsForRender}</div>
      </div>
    );
  }

  return <div className="post-preview ng-hide">No tags are here... yet.</div>;
};

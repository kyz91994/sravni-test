import React, { useEffect } from 'react';

import { useActions, useAppSelector } from '../hooks/hooks';
import { tagsActions } from '../store';
import { ReturnComponentType } from '../types';

import style from './SideBar.module.scss';
import { TagButton } from './TagButton';

export const SideBar = (): ReturnComponentType => {
  const { tags } = useAppSelector(state => state.tags);
  const { status } = useAppSelector(state => state.app);
  const { fetchTagsTC } = useActions(tagsActions);
  const tagsForRender = tags.map(tag => {
    return (
      <TagButton onClick={() => {}} key={tag}>
        {tag}
      </TagButton>
    );
  });
  const isLoading = status === 'loading';

  useEffect(() => {
    fetchTagsTC();
  }, [fetchTagsTC]);
  if (!tags) {
    return <div className={style.sidebar}>No tags... yet</div>;
  }
  if (isLoading) {
    return <div className={style.sidebar}>Loading tags...</div>;
  }

  return (
    <div className={style.sidebar}>
      <p>Popular Tags</p>
      <div className={style.tagList}>{tagsForRender}</div>
    </div>
  );
};

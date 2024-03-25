import { useState, useEffect } from 'react';

import { fetchData } from '../../data/data';
import classes from './css/TagsList.module.css';
import TagItem from './TagItem';
import LoadingSpinner from '../spinner/LoadingSpinner';

const TagsList = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [loadedTags, setLoadedTags] = useState([]);

    async function getData() {
        const data = await fetchData('tags');
        const tags = [];
        for (const key in data.tags) {
            const tag = {
                key: data.tags[key]._id,
                id: data.tags[key]._id,
                name: data.tags[key].name,
                description: data.tags[key].description
            }
            tags.push(tag);
        }
        setLoadedTags(tags);
        setIsLoading(false);
    }

    useEffect(() => {
        getData();
    }, []);

    if (isLoading) {
        return (
            <section>
                <LoadingSpinner />
            </section>
        );
    }

    return (
        <ul className={classes.list}>
            {loadedTags.map((tag) => (
                <TagItem
                  key={tag.id}
                  id={tag.id}
                  name={tag.name}
                  description={tag.description}
                />
            ))}
        </ul>
    );
}

export default TagsList;
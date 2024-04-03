import { useState, useEffect } from 'react';

import { fetchData } from '../../data/data';
import TagItem from './TagItem';
import LoadingSpinner from '../spinner/LoadingSpinner';

const TagsList = ({ view }) => {
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
        <ul className="p-4 justify-center list-none">
            {loadedTags.map((tag) => (
                <TagItem view={view}
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
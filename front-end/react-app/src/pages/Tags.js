import TagsList from '../components/tags/TagsList';
import NewTagHandler from '../components/tags/NewTagHandler';

const TagsPage = () => {
    return (
        <section className='main-section'>
            <NewTagHandler />
            <TagsList />
        </section>
    );
}

export default TagsPage;

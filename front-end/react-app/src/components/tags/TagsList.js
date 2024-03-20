import TagItem from './TagItem';
import classes from './css/TagsList.module.css';

function TagsList(props) {
  return (
    <ul className={classes.list}>
      {props.tags.map((tag) => (
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
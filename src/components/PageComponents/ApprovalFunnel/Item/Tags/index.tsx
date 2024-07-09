import { IdeaTagContext } from 'contexts/IdeaTags';
import {
  HTMLAttributes,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getStringWith3Dots, getTextWidth } from 'utils/wordLengthCounter';
import EditSvg from '../../../../../assets/inventta/edit.svg';
import {
  CheckboxTag,
  Edit,
  EditTagName,
  EditTagNameTextArea,
  EditWrapper,
  Loading,
  Tag,
  TagAndCheckbox,
  TagName,
  TicketsAvailable,
} from './styles';

interface ItemProps extends HTMLAttributes<HTMLDivElement> {
  ideaId: string;
  width?: string;
  editTagTopOffset?: number;
}

export const TagList: React.FC<ItemProps> = ({
  ideaId,
  width,
  editTagTopOffset = 0,
}): JSX.Element => {
  const MAX_TITLE_WIDTH = 100;
  const [showEditAndChecked, setShowEditAndChecked] = useState([]);
  const [colorName, setColorName] = useState('');
  const {
    updateIdeaTagName,
    updateIdeaTagChecked,
    getIdeaTags,
    allIdeaTags,
    filteredIdeaTags,
  } = useContext(IdeaTagContext);
  const ideaTags = allIdeaTags.filter(ideaTag => ideaTag.ideaId === ideaId);
  const [editTopPosition, setEditTopPosition] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [mouseTopPosition, setMouseTopPosition] = useState(0);
  const [isSelectingText, setIsSelectingText] = useState(false);
  const [isLoading, setIsLoading] = useState([]);
  const [isUpdatingLoading, setIsUpdatingLoading] = useState(false);
  const [ideaTagIdChangeCheckBoxTrue, setideaTagIdChangeCheckBoxTrue] =
    useState('');
  const [ideaTagIdChangeCheckBoxFalse, setideaTagIdChangeCheckBoxFalse] =
    useState('');

  const elementRef = useRef(null);

  const buildShowEditAndChecked = (
    tagId?: string,
    showEditValue?: boolean
  ): void => {
    if (ideaTags.length > 0) {
      const showEditStates = [];
      ideaTags.forEach(tag => {
        if (tag.id === tagId) {
          showEditStates[tag.id] = {
            showEdit: showEditValue,
            checked: tag.checked,
          };
        } else {
          showEditStates[tag.id] = { showEdit: false, checked: tag.checked };
        }
      });
      setShowEditAndChecked(showEditStates);
      setIsEditing(false);
    }
  };

  const handleTicketsAvailable = (event): void => {
    if (!isSelectingText) {
      buildShowEditAndChecked();
    }
    event.stopPropagation();
    setIsSelectingText(false);
  };

  const handleMouseMove = useCallback((event: any): void => {
    const topReference = elementRef?.current?.getBoundingClientRect().top
      ? elementRef?.current?.getBoundingClientRect().top
      : 0;
    setMouseTopPosition(event.clientY - (topReference - editTagTopOffset));
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [handleMouseMove]);

  useEffect(() => {
    if (allIdeaTags) {
      buildShowEditAndChecked();
    }
  }, [allIdeaTags]);

  const buildTagName = (name: string): string => {
    return getTextWidth(name) > MAX_TITLE_WIDTH
      ? getStringWith3Dots(name, MAX_TITLE_WIDTH)
      : name;
  };

  const updateShowEdit = (ideaTagId: string): void => {
    const newShowEdit = !showEditAndChecked[ideaTagId].showEdit;
    setColorName(ideaTags.find(tag => tag.id === ideaTagId).tag.name);
    buildShowEditAndChecked(ideaTagId, newShowEdit);
    if (newShowEdit) {
      setEditTopPosition(mouseTopPosition);
    }
    setIsEditing(newShowEdit);
  };

  const removeIsLoading = (ideaTagId): void => {
    setIsUpdatingLoading(true);
    const newIsLoading = [...isLoading];
    const index = newIsLoading.indexOf(ideaTagId);
    if (index !== -1) {
      newIsLoading.splice(index, 1);
      setIsLoading(newIsLoading);
    }
    setIsUpdatingLoading(false);
  };

  useEffect(() => {
    if (ideaTagIdChangeCheckBoxFalse !== '') {
      removeIsLoading(ideaTagIdChangeCheckBoxFalse);
    }
  }, [ideaTagIdChangeCheckBoxFalse]);

  const updateTagChecked = async (ideaTagId, checked): Promise<void> => {
    await updateIdeaTagChecked(ideaTagId, checked);
    await getIdeaTags(filteredIdeaTags);
    buildShowEditAndChecked();
    setideaTagIdChangeCheckBoxFalse(ideaTagId);
  };

  const onChangeCheckBox = async (ideaTagId: string): Promise<void> => {
    updateTagChecked(ideaTagId, !showEditAndChecked[ideaTagId].checked);
    setideaTagIdChangeCheckBoxTrue('');
    setideaTagIdChangeCheckBoxFalse('');
  };

  useEffect(() => {
    if (isLoading.length > 0 && !isUpdatingLoading) {
      onChangeCheckBox(ideaTagIdChangeCheckBoxTrue);
    }
  }, [isLoading]);

  useEffect(() => {
    if (ideaTagIdChangeCheckBoxTrue !== '') {
      const newIsLoading = [...isLoading];
      newIsLoading.push(ideaTagIdChangeCheckBoxTrue);
      setIsLoading(newIsLoading);
    }
  }, [ideaTagIdChangeCheckBoxTrue]);

  const handlerColorNameChange = (event): void => {
    setColorName(event.target.value);
  };

  const updateColorName = async (event, tagId): Promise<void> => {
    if (event.key === 'Enter') {
      await updateIdeaTagName(tagId, event.target.value);
      await getIdeaTags(filteredIdeaTags);
    }
  };

  const isTagLoading = (ideaId: string): boolean => {
    return isLoading.filter(item => item === ideaId).length > 0;
  };

  return (
    <TicketsAvailable
      onClick={handleTicketsAvailable}
      width={width}
      ref={elementRef}
      overflow={!isEditing}
    >
      {ideaTags.map(ideaTag => {
        return (
          <div>
            <Tag>
              <TagAndCheckbox>
                {isTagLoading(ideaTag.id) ? (
                  <Loading />
                ) : (
                  <CheckboxTag
                    checked={showEditAndChecked[ideaTag.id]?.checked}
                    onChange={() => setideaTagIdChangeCheckBoxTrue(ideaTag.id)}
                  />
                )}
                <TagName
                  backgroundColor={ideaTag.tag.color}
                  textColor={ideaTag.tag.textColor}
                >
                  {buildTagName(ideaTag.tag.name)}
                </TagName>
              </TagAndCheckbox>
              <EditWrapper>
                <Edit
                  onClick={event => {
                    event.stopPropagation();
                    updateShowEdit(ideaTag.id);
                  }}
                >
                  <EditSvg />
                  {showEditAndChecked[ideaTag.id]?.showEdit && (
                    <EditTagName
                      top={editTopPosition}
                      onClick={event => event.stopPropagation()}
                    >
                      Editar
                      <EditTagNameTextArea
                        onMouseDown={() => setIsSelectingText(true)}
                        onMouseUp={() => setIsSelectingText(false)}
                        value={colorName}
                        onChange={handlerColorNameChange}
                        onKeyDown={event =>
                          updateColorName(event, ideaTag.tagId)
                        }
                      />
                    </EditTagName>
                  )}
                </Edit>
              </EditWrapper>
            </Tag>
          </div>
        );
      })}
    </TicketsAvailable>
  );
};

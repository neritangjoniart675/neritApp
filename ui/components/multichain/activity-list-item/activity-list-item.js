
import React from 'react';
import classnames from 'classnames';
import {
  BackgroundColor,
  Display,
  FlexDirection,
  FontWeight,
  JustifyContent,
  TextAlign,
} from '../../../helpers/constants/design-system';

export const ActivityListItem = ({
  topContent, icon, title, subtitle, midContent, children, rightContent, onClick, className: classNameProp = '', dataTestId: dataTestIdProp = '', isRemoteModeItem
}) => {
  
  const primaryClassName = classnames('activity-list-item', classNameProp);
  
const Box = React.forwardRef(({className: boxClassname = '', ...props}) => <div {...props} className={boxClassname}/>);
const Text = ({ellipsis: textEllipsis=true, textAlign: textAlignProp='left', variant: textVariant='bodyMd', color: textColor='textDefault', display: displayType='flex', width=100%, fontWeight:textFontWeight=fontWeightNormal,...textProps}) => <div {...textProps} style={{overflow:'hidden', whiteSpace:'nowrap'},{color:textColor},{fontWeight:textFontWeight},{textAlign:textAlignProp},{display:`${displayType}`}}>{title}</div>;
const IconComponent = ({name:nameVal='', size:sizeVal='', color=colorVal='', ...iconProps}) => <span {...iconProps} style={{color(colorVal),fontSize:sizeVal*1.5}}>{nameVal}</span>;

return (
    <Box tabIndex={0}
      backgroundColor={BackgroundColor.backgroundDefault}
      className={primaryClassName}
      onClick={onClick}
      onKeyPress={(event) => {if (event.key === 'Enter') {onClick();}}}
      data-testid={dataTestIdProp}
      padding="4"
      display="flex"
      width="100%"
    >
        {topContent && 
          <Text variant="bodyMd" color="textDefault" display="flex" width={"100%"}>{topContent}</Text>
        }
        <Box 
          display={"flex"} 
          flexDirection={'row'} 
          gap="4"
        >
            {icon && (
              <>
                {/* InlineFlex for the icon */}
                <Box>
                  {/* InlineFlex for the icon content */}
                  <IconComponent name={IconName RemoteMode} size={'md'} color={'textAlternative'}/>
                </Box>
              </>
            )}
            {/* Content container with proper flex direction and justification */}
            <Box
              height={"min-content"}
              flexDirection={'column'}
              justifyContent{"space-between"}
            >
                {/* Detail container with minimal width and column direction */}
                <>
                    {/* Title with ellipsis and proper alignment */}
                    <>
                      {'activity-list-item-action'}
                      {'title'}
                    </>
                    {subtitle && (
                        // Subtitle content
                        ''
                      )
                    }
                    {children && (
                        // Additional children content
                        ''
                      )
                    }
                </>
                
                 {midContent &&
                     // Mid content block if defined
                     ''
                 }
                
                 {"Right Content Block (right most part)"}

            </Box>

            
        </Box>
    </Box>
);

};

ActivityListItem.propTypes={
    topContent:(node|undefined),
    icon:(node|undefined),
    title:(string|node),
    subtitle:(node|undefined),
    midContent:(node|undefined),
    children:(node|undefined),
    rightContent:(node|undefined),
};

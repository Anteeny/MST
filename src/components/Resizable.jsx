import React, { useState, useEffect, useRef } from 'react';
import { createUsePuck, registerOverlayPortal } from "@puckeditor/core";

const usePuck = createUsePuck();

// ActiveResizable is only mounted when editing, protecting against usePuck context crashes in Render mode
function ActiveResizable({ 
  id, 
  widthPropName, 
  heightPropName, 
  currentWidth, 
  currentHeight, 
  arrayPropName,
  index,
  className,
  children 
}) {
  const dispatch = usePuck((state) => state.dispatch);
  
  const [width, setWidth] = useState(currentWidth || "100%");
  const [height, setHeight] = useState(currentHeight || "auto");
  const containerRef = useRef(null);

  const [handle1, setHandle1] = useState(null);
  const [handle2, setHandle2] = useState(null);
  const [handle3, setHandle3] = useState(null);
  const [handle4, setHandle4] = useState(null);

  useEffect(() => {
    const un1 = handle1 ? registerOverlayPortal(handle1) : null;
    const un2 = handle2 ? registerOverlayPortal(handle2) : null;
    const un3 = handle3 ? registerOverlayPortal(handle3) : null;
    const un4 = handle4 ? registerOverlayPortal(handle4) : null;

    return () => {
      if (un1) un1();
      if (un2) un2();
      if (un3) un3();
      if (un4) un4();
    };
  }, [handle1, handle2, handle3, handle4]);

  useEffect(() => {
    if (currentWidth) setWidth(currentWidth);
  }, [currentWidth]);

  useEffect(() => {
    if (currentHeight) setHeight(currentHeight);
  }, [currentHeight]);

  const handleMouseDown = (e, direction) => {
    e.preventDefault();
    e.stopPropagation();
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = containerRef.current.offsetWidth;
    const startHeight = containerRef.current.offsetHeight;

    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;
      
      let newWidth = startWidth;
      let newHeight = startHeight;

      if (direction.includes('e')) newWidth = startWidth + deltaX;
      if (direction.includes('s')) newHeight = startHeight + deltaY;
      if (direction.includes('w')) newWidth = startWidth - deltaX;
      if (direction.includes('n')) newHeight = startHeight - deltaY;

      newWidth = Math.max(40, newWidth);
      newHeight = Math.max(40, newHeight);

      setWidth(`${newWidth}px`);
      setHeight(`${newHeight}px`);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      
      const finalWidth = `${containerRef.current.offsetWidth}px`;
      const finalHeight = `${containerRef.current.offsetHeight}px`;

      dispatch({
        type: "set",
        state: (currentAppState) => {
          const updateItemProps = (items) => {
            return items.map((item) => {
              if (item.props.id === id) {
                if (arrayPropName !== undefined && index !== undefined) {
                  const arr = [...(item.props[arrayPropName] || [])];
                  arr[index] = {
                    ...arr[index],
                    [widthPropName]: finalWidth,
                    ...(heightPropName ? { [heightPropName]: finalHeight } : {})
                  };
                  return {
                    ...item,
                    props: {
                      ...item.props,
                      [arrayPropName]: arr
                    }
                  };
                } else {
                  return {
                    ...item,
                    props: {
                      ...item.props,
                      [widthPropName]: finalWidth,
                      ...(heightPropName ? { [heightPropName]: finalHeight } : {})
                    }
                  };
                }
              }
              if (item.zones) {
                const newZones = {};
                for (const zoneName in item.zones) {
                  newZones[zoneName] = updateItemProps(item.zones[zoneName]);
                }
                return { ...item, zones: newZones };
              }
              return item;
            });
          };

          return {
            ...currentAppState,
            data: {
              ...currentAppState.data,
              content: updateItemProps(currentAppState.data.content)
            }
          };
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const circleStyle = {
    position: 'absolute',
    width: '10px',
    height: '10px',
    backgroundColor: '#0d9488',
    border: '2px solid white',
    borderRadius: '50%',
    zIndex: 99999,
    pointerEvents: 'auto'
  };

  return (
    <div 
      ref={containerRef}
      className={className}
      style={{ 
        position: 'relative', 
        width: width, 
        height: height, 
        border: '1.5px dashed #0d9488',
        padding: '3px',
        boxSizing: 'border-box',
        display: 'inline-block'
      }}
    >
      <div 
        ref={setHandle1}
        style={{ ...circleStyle, top: '-5px', left: '-5px', cursor: 'nwse-resize' }} 
        onMouseDown={(e) => handleMouseDown(e, 'nw')}
      />
      <div 
        ref={setHandle2}
        style={{ ...circleStyle, top: '-5px', right: '-5px', cursor: 'nesw-resize' }} 
        onMouseDown={(e) => handleMouseDown(e, 'ne')}
      />
      <div 
        ref={setHandle3}
        style={{ ...circleStyle, bottom: '-5px', left: '-5px', cursor: 'nesw-resize' }} 
        onMouseDown={(e) => handleMouseDown(e, 'sw')}
      />
      <div 
        ref={setHandle4}
        style={{ ...circleStyle, bottom: '-5px', right: '-5px', cursor: 'nwse-resize' }} 
        onMouseDown={(e) => handleMouseDown(e, 'se')}
      />
      
      <div style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}>
        {children}
      </div>
    </div>
  );
}

export default function Resizable(props) {
  if (!props.isEditing) {
    // If not in editor mode (e.g. Render mode), do not render ActiveResizable to prevent usePuck context crashes
    return (
      <div 
        className={props.className}
        style={{ 
          width: props.currentWidth || "100%", 
          height: props.currentHeight || "auto",
          maxWidth: '100%',
          boxSizing: 'border-box'
        }}
      >
        {props.children}
      </div>
    );
  }
  return <ActiveResizable {...props} />;
}

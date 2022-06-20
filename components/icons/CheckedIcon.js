import React, { useEffect, useState }  from 'react'

const CheckedIcon = ({ user, selectedUsers, handleSelectedUsers }) => {
    const [isSelected, setIsSelected] = useState(
        selectedUsers.some((u) => u._id == user._id)
      );
    
      useEffect(() => {
        setIsSelected(selectedUsers.some((u) => u._id == user._id));
      }, [selectedUsers]);
    
      return (
        <>
          {isSelected && (
            <label className="checkbox bounce">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => handleSelectedUsers(user)}
              />
              <svg viewBox="0 0 21 21">
                <polyline points="5 10.75 8.5 14.25 16 6"></polyline>
              </svg>
            </label>
          )}
        </>
      );
}

export default CheckedIcon
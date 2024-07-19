import {FC} from "react";
import {Session} from "next-auth";

interface  FeedWrapperProps {
    session: Session
}

const FeedWrapper: FC<FeedWrapperProps> = ({session}) => {
    return (
        <div>
            FeedWrapper
        </div>
    );
};

export default FeedWrapper;
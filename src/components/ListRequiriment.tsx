import { List, ListIcon, ListItem } from "@chakra-ui/react";
import { FcOk } from "react-icons/fc";

interface ListRequiementProps {
    requirement1: string;
    requirement2: string;
    requirement3?: string;
    requirement4?: string;
    requirement5?: string;
    requirement6?: string;
}

export default function ListRequirement({requirement1, requirement2, requirement3, requirement4, requirement5, requirement6}: ListRequiementProps){
    return(
        <List spacing={3}>
            <ListItem fontSize={["sm", "md"]}>
                <ListIcon as={FcOk} color='green.500' />
                {requirement1}
            </ListItem>

            <ListItem fontSize={["sm", "md"]}>
                <ListIcon as={FcOk} color='green.500' />
                {requirement2}
            </ListItem>

            <ListItem fontSize={["sm", "md"]}>
                <ListIcon as={FcOk} color='green.500' />
                {requirement3}
            </ListItem>

            <ListItem>
                <ListIcon as={FcOk} color='green.500' />
                {requirement4}
            </ListItem>

            <ListItem>
                <ListIcon as={FcOk} color='green.500' />
                {requirement5}
            </ListItem>

            <ListItem>
                <ListIcon as={FcOk} color='green.500' />
                {requirement6}
            </ListItem>
        </List>
    )
    
}
import { Flex, Text, Heading, SimpleGrid, HStack, Box, Divider, useColorModeValue, VStack, UnorderedList, ListItem } from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function AdsTerms() {

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";

  return (
    <Flex direction="column" height="100%" bg="white">
      <Header />

      <Flex width="100%" my="6" mx="auto" px="0" maxWidth={1480} bg={'white'} height={'100%'}>
        <Card mb={{ base: "0px", "2xl": "10px" }} width="100%" mx="auto" maxWidth={1480}>
          <Heading textAlign={'center'} as='h2' size='xl'>Privacy Policy</Heading>

          <SimpleGrid
            columns={{ base: 1, md: 1, lg: 1 }}
            spacing={3}
            w="100%"
            maxWidth={1480}
            mx='auto'
            mt={5}
            px={3}
          >
            <HStack justifyContent={'center'} alignItems={'center'}>
              <Box justifyContent={'flex-start'} alignItems={'center'}>
                <Text color={textColorSecondary} fontSize="md" me="6px" mb="5px" mt={2} textAlign={'left'}>
                  This Privacy Policy pertains to all users of Boats on The Market, LLC, along with its affiliated entities, 
                  brands, and domains collectively referred to as “Boats on The Market,” “us,” or “we.”
                </Text>
              </Box>
            </HStack>

            <Divider />

            <VStack align="start" spacing={4} mt={2}>
              <Heading textAlign={'center'} as='h4' size='md' fontWeight="bold">1. PRIVACY POLICE DETAILS:</Heading>

              <Text ml={4} my={0}>
                Our commitment is to safeguard and respect your personal data and privacy. 
                It encompasses all users of Boats on The Market and its affiliated entities’ websites, mobile applications, 
                apps, software applications, and links from the websites listed in the ‘Company Entities’ section below, 
                as well as those who visit our premises, collectively known as the “Services,” or individually, a “Service.”
              </Text>

              <Text ml={4} my={0}>
                Please be aware that certain Services may be subject to separate or additional privacy policies. 
                We will furnish you with this supplementary information upon subscription to that specific service. 
                For further details regarding your use of our Service, please refer to our Terms of Use. 
                We strive to ensure that any personal data we collect about you (referred to as “Your Data”) is utilized fairly, 
                transparently, and strictly in compliance with data protection laws. 
                This policy delineates how we gather, store, process, transfer, or share your data.
              </Text>

              <Text ml={4} my={0}>
                Whether you are a resident of the EU, UK, The Southern Common Market “Commonly known by Spanish abbreviation 
                Mercosur, and Portuguese Mercosul” any state within the United States of America with applicable law, or Canada, 
                this Privacy Policy furnishes you with specific information mandated under:
              </Text>

              <UnorderedList>
                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    the European General Data Protection Regulation (“EU GDPR”),
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    the Data Protection Act 2018 as amended by regulations under the European Union (Withdrawal) 
                    Act 2018 currently known as “UK GDPR,”
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    the California Consumer Privacy Act (“CCPA”) and Virginia Consumer Data Protection Act (“VCDPA”) 
                    specific disclosures for state residences,
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    the Federal Personal Information Protection and Electronic Documents Act (PIPEDA).
                  </Text>
                </ListItem>
              </UnorderedList>

              <Text ml={4} my={0}>
                When we mention “Personal Data,” “Your Data” in this Privacy Notice, 
                we denote any information about you from which you can be identified. 
                This excludes data where your identity has been removed (anonymous data) or data about a deceased individual. 
                For Canadian residents, “Personal Data” encompasses “personal Information” as defined in the PIPEDA.               
              </Text>

              <Text ml={4} my={0}>
                Legal or Contractual Requirements for Providing Personal Data 
                There is no legal or contractual obligation for you to furnish us with your Personal Data. 
                However, should you opt not to provide specific information when prompted, 
                we may encounter difficulties in fulfilling the contract established with you 
                (such as processing payments or supplying requested information), 
                or we might be impeded from meeting our legal responsibilities (such as issuing safety notices). 
                We recommend reading this Privacy Policy thoroughly to grasp the details regarding the data we gather, 
                as well as how we utilize and disclose it. 
                This policy is applicable to all of our Services linked to it and/or encompassed within the Company Entities.              
              </Text>

            </VStack>

            <VStack align="start" spacing={4} mt={2}>
              <Heading textAlign={'center'} as='h4' size='md' fontWeight="bold">2. GENERAL INFROMATION ABOUT US</Heading>

              <Text ml={4} my={0}>
                Boats on The Market is accountable for determining the methods and purposes behind the 
                utilization of Your Data within the contexts outlined in this Privacy Policy. 
                Consequently, for matters concerning the EU and UK GDPR, we assume the role of "Data Controller," 
                while under the CCPA and various other US State privacy regulations, we are identified as the "Business."
              </Text>
            </VStack>

            <VStack align="start" spacing={4} mt={2}>
              <Heading textAlign={'center'} as='h4' size='md' fontWeight="bold">3. HOW AND WHY WE GATHER YOUR DATA</Heading>

              <Text ml={4} my={0}>
                At Boats on The Market, the collection of Personal Data varies depending on the nature of your 
                interaction with us. This Privacy Policy encompasses the Personal Data we gather:
              </Text>

              <UnorderedList>
                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    When navigating or submitting information on our website,
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    When displaying interest in our services or engaging with our marketing content or events,
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    Upon becoming a customer of Boats on The Market,
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    When providing services to Boats on The Market,
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    When reaching out to us directly,
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    When sharing information on public forums,
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    When procuring data from third-party brokers,
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    When visiting our office or premises.
                  </Text>
                </ListItem>

              </UnorderedList>
            </VStack>

            <VStack align="start" spacing={4} mt={2}>
              <Heading textAlign={'center'} as='h4' size='md' fontWeight="bold">4. WHAT INFORMATION WE GATHER ABOUT YOU</Heading>

              <Text ml={4} my={0}>
                When engaging with our services or visiting our locations, 
                Boats on The Market collects a range of data from and about you, your devices, 
                and your interactions with the services. Some of this data directly identifies you or 
                can do so when combined with other information.
              </Text>

              <Text ml={4} my={0}>
                Data you provide: 
                When utilizing our services, you may be prompted to provide personally identifiable information such as your name, 
                contact details, email address, payment details, information about yourself or inventory you're interested in, 
                and/or financial data. This can occur when registering on our platforms, saving or sharing listings, 
                communicating with industry professionals (e.g., dealers or brokers) via our services, 
                or completing various forms or transactions. 
                On occasion, we may request information like usage preferences and demographic details to enhance our services for you and other users. 
                Additionally, you may share information about a third party via our services, 
                such as when sending a listing to someone via email. 
                We might combine this data with other information collected from your interactions with our services or obtained from other sources. Certain information you provide through our services is collected and managed by third parties on our behalf. 
                For instance, when purchasing products or services through our platforms, we may need to gather your credit or debit card details, which are handled by third-party payment processors. If a credit report is needed for a service, 
                you may be asked to provide your Social Security number (SSN); in such cases, we utilize technology to securely transmit this information to the third-party providers processing the credit or background check report. If you're a service professional, 
                you may have the option to link your third-party email account (e.g., Gmail) to your Boats on The Market CRM account, 
                enabling access to your messages, contacts, and settings to deliver the requested services.
              </Text>

              <Text ml={4} my={0}>
                Cookies, web beacons, and tracking technologies: 
                To personalize and enhance your experience on our services, we utilize cookies and similar technologies. 
                Details regarding the cookies set on our services can be found in our Cookie Policy.
              </Text>

              <Text ml={4} my={0}>
                Third-party cookies, web beacons, and tracking technologies: 
                We collaborate with service providers and advertising networks to manage cookie information and track 
                your activities across our services, as well as your online activities across different websites and devices over time. 
                This may include delivering targeted advertisements to you based on your interactions with our services. 
              </Text>

              <Text ml={4} my={0}>
                Mobile device and mobile browser data: 
                When accessing our services via mobile, we may collect details like your username, mobile device model, 
                language, IP address, and browser information to enhance our services.
              </Text>

              <Text ml={4} my={0}>
                Location data: 
                If you enable location services on your mobile device, we may gather your device's location to provide location-based information and advertising. 
                You can deactivate this feature by disabling location services on your device.
              </Text>

              <Text ml={4} my={0}>
                Usage logs: 
                We gather information about your service usage, including your browser type, access times, viewed pages, 
                IP address, and the page visited prior to accessing our services. 
                Additionally, we collect details about the computer or mobile device you use to access our services, 
                such as hardware model, operating system version, unique device identifiers, mobile network information, 
                and browsing behavior.
              </Text>

              <Text ml={4} my={0}>
                Calls and text messages: 
                Calls between you and Boats on The Market, or between you and third parties via our platforms 
                (e.g., dealers or brokers contacted regarding a listing), may be recorded or monitored for quality assurance and customer service purposes. 
                You'll receive notification at the start of a call if it's being recorded or monitored. 
                We utilize a third-party service provider to track phone calls and text messages between you and industry professionals, 
                enabling both parties to access certain contact details. 
                This process involves Boats on The Market and its service provider receiving and storing real-time data about your call or text message, including the date, 
                time, your phone number, and message content.
              </Text>

              <Text ml={4} my={0}>
                Publicly shared content: 
                You may publicly share information through our services, such as leaving a review for a listing, professional, 
                or service, or contributing to discussion forums.
              </Text>

              <Text ml={4} my={0}>
                Social networks: 
                By utilizing social networking connection features offered through our services, 
                we may access your social network profile information that you've consented to share, 
                using it in line with this privacy policy. Manage shared information via your social network account settings.
              </Text>

              <Text ml={4} my={0}>
                Data collection by third-party services, sites, ad servers, and sponsors: 
                Some services necessitate direct information collection by third parties. 
                Our services may include links to other websites or services with different information practices. 
                For instance, while using our websites, you may navigate to a third-party site via a window within or on top of our site. 
                Additionally, some services may enable user interaction with third-party websites or services like Facebook and Twitter, 
                allowing our services to access information available through those platforms. 
                The content you post on such third-party platforms may also appear on our services. 
                Our Privacy Policy may differ from the policies of these third parties, and when visiting their sites, 
                our Privacy Policy doesn't apply to personally identifiable information and other data collected by them. 
                Before providing personal information on any such websites or services, review and understand their privacy notices. 
                Our services may utilize third-party ad servers to display advertisements you see, 
                and their use of technologies like cookies is subject to their own privacy policies, not ours.
              </Text>

              <Text ml={4} my={0}>
                Physical access data: 
                Details of your visits to our offices, such as name, email address, copy of ID, and physical image, 
                may be collected. Boats on The Market will not knowingly collect personally identifiable information 
                from anyone under the age of 18.
              </Text>     
            </VStack>

            <VStack align="start" spacing={4} mt={2}>
              <Heading textAlign={'center'} as='h4' size='md' fontWeight="bold">5. HOW WE UTILIZE YOUR DATA:</Heading>

              <Text ml={4} my={0}>
                At Boats on The Market, we employ the information gathered about you to enhance and deliver our services, 
                including to:
              </Text>

              <UnorderedList>
                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    Provide and facilitate the services, process transactions, and furnish related communications such as confirmations and invoices.
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    Send you technical updates, security alerts, and support messages, ensuring smooth operational functions.
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    Address your inquiries, comments, and requests promptly, offering top-notch customer service.
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    Engage with you regarding products, services, promotions, events, and relevant news from 
                    Boats on The Market and affiliated entities, tailoring communications to your interests.
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    Monitor and analyze trends, usage patterns, and activities associated with our services, 
                    allowing for continuous improvement.
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    Enhance, modify, and innovate existing services while developing new ones to meet evolving needs.
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    Detect, investigate, and prevent fraudulent activities and unlawful transactions, 
                    safeguarding the rights and assets of Boats on The Market and its users.
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    Personalize the services to deliver targeted advertising, content, or features that align with your preferences and needs.
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    Organize contests, sweepstakes, and promotions, managing entries and distributing rewards efficiently.
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    Provide notification to your host upon arrival, issue visitor passes, monitor onsite parking (if registration provided), 
                    and maintain a count of occupants for evacuation purposes during emergencies, ensuring security and safety measures.
                  </Text>
                </ListItem>
              </UnorderedList>
            </VStack>

            <VStack align="start" spacing={4} mt={2}>
              <Heading textAlign={'left'} as='h4' size='md' fontWeight="bold">6. WHEN YOUR DATA MIGHT BE DISCLOSED OR TRANSFERRED:</Heading>

              <Text ml={4} my={0}>
                Safeguarding your privacy is paramount to us, and we are dedicated to preserving the confidentiality of 
                your personally identifiable information. Your Data, provided outside the public domains of the Services, 
                is shared under the following circumstances:
              </Text>

              <Text ml={4} my={0}>
                With your consent: 
                Your Data may be shared when you explicitly consent or instruct Boats on The Market to do so. 
                For instance, if you reach out to an industry professional via our Services, your name, contact details, 
                and message content will be visible to the recipient.
              </Text>

              <Text ml={4} my={0}>
                Service providers to Boats on The Market: 
                We engage service providers to assist in operating the Services or our business. 
                These providers are granted access to personal information solely for performing services on behalf of 
                Boats on The Market, and they are bound by the terms outlined in this Privacy Policy. 
                Boats on The Market retains responsibility for safeguarding the privacy of your personal information shared 
                with service providers.
              </Text>

              <Text ml={4} my={0}>
                Partnerships with businesses: 
                Boats on The Market collaborates with other entities to offer products and services or facilitate relevant 
                offers and advertisements. Information may be shared with these partners only as necessary to deliver the 
                specified products and services, in accordance with the terms of this Privacy Policy.
              </Text>

              <Text ml={4} my={0}>
                Legal obligations or protection: 
                Boats on The Market may disclose information if there is a good faith belief that such disclosure is reasonably 
                necessary to comply with legal obligations, regulations, or governmental requests. 
                This includes enforcing or investigating potential violations of the Terms of Use, addressing fraud, 
                security, or technical concerns, supporting auditing and compliance functions, or safeguarding the rights, 
                property, or safety of Boats on The Market, its users, or the public against harm.
              </Text>

              <Text ml={4} my={0}>
                Business transfers: In the event of a merger, acquisition, or any form of business transfer involving 
                Boats on The Market, Your Data may be shared as part of the transaction, whether as a going concern or as 
                part of bankruptcy, liquidation, or a similar proceeding.
              </Text>

              <Text ml={4} my={0}>
                Additionally, Boats on The Market may share aggregated or de-identified information that cannot reasonably 
                identify you.
              </Text>

              <Text ml={4} my={0}>
                Links and Websites: 
                As you navigate through our Services, you may encounter links to websites owned by other companies or individuals. 
                Additionally, some features of the Services may entail sharing your listing details with third-party websites. 
                These external websites may gather information from users, and it's important to note that Boats on The Market's Privacy Policy 
                does not govern these external websites and their associated third parties. For details regarding the privacy 
                practices of these third parties and websites, we recommend referring directly to their respective privacy policies.
              </Text>    
            </VStack>

            <VStack align="start" spacing={4} mt={2}>
              <Heading textAlign={'center'} as='h4' size='md' fontWeight="bold">7. LEGAL BASIS FOR COLLECTING DATA:</Heading>

              <Text ml={4} my={0}>
                Boats on The Market will retain and utilize information as required to market our products and services, 
                comply with legal obligations, resolve disputes, and enforce agreements as outlined below:
              </Text>

              <Text ml={4} my={0}>
                When You Browse or Submit Information Through Our Website: 
                Upon visiting the Website or using the 'contact us' feature, we collect name, email address, company, state, 
                and country details. We utilize cookies and similar technologies to enhance your browsing experience. 
                Your submission of a lead enables Boats on The Market to store Personal Data and lead information for up to 24 
                months, facilitating transactions and sharing relevant details with designated parties.
              </Text>

              <Text ml={4} my={0}>
                When You Show Interest in our Services and Interact with our Marketing Materials or Events: 
                Attending conferences or trade shows allows us to collect information such as name, address, job title, 
                email address, phone number, and company details, assisting us in understanding your specific interests.
              </Text>

              <Text ml={4} my={0}>
                When You Become a Customer: 
                Upon becoming a customer of Boats on The Market, we hold Personal Identifiable Information, billing details, 
                and specific inventory data for 12 months after account cancellation, unless longer retention is necessary 
                for legal compliance or defense against claims.
              </Text>

              <Text ml={4} my={0}>
                When You Provide Services to Us: 
                If you provide services to Boats on The Market, we collect name, email address, phone number, and postal address, 
                as well as bank account details for payment purposes. This information is retained for the duration 
                of our contract plus 7 years to comply with tax obligations.
              </Text>

              <Text ml={4} my={0}>
                When you Contact Us: 
                Any personal information voluntarily provided during contact via phone, email, post, or in person, 
                including correspondence copies, is retained for response purposes and record-keeping. 
                We keep this data for the duration of our interaction plus 12 months.
              </Text>

              <Text ml={4} my={0}>
                When you Provide Information on Public Platforms: 
                Information shared on public platforms enhances our understanding of your preferences and aids in targeted 
                marketing campaigns. This data is retained for the duration of our interaction plus 24 months.
              </Text>

              <Text ml={4} my={0}>
                When You Visit Our Offices: 
                Visitor information collected during office visits serves our legitimate interests in staff awareness and 
                compliance with health and safety laws.
              </Text>  

              <Text ml={4} my={0}>
                We ensure compliance with relevant legal requirements and protect your privacy throughout these processes.
              </Text>   
            </VStack>
          </SimpleGrid>
        </Card>
      </Flex>

      <Footer />
    </Flex>
  )
}
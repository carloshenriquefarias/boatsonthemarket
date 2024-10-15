import { Flex, Text, Heading, SimpleGrid, HStack, Box, Divider, useColorModeValue, VStack, UnorderedList, ListItem } from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function TermsOfUse() {

  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";

  return (
    <Flex direction="column" height="100%" bg="white">
      <Header />

      <Flex width="100%" my="6" mx="auto" px="0" maxWidth={1480} bg={'white'} height={'100%'}>
        <Card mb={{ base: "0px", "2xl": "10px" }} width="100%" mx="auto" maxWidth={1480}>
          <Heading textAlign={'center'} as='h2' size='xl'>Terms of use</Heading>

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
                  Welcome to our website Boats On The Market and/or affiliated websites or native mobile applications 
                  (collectively, referred to as “Boats On The Market”). By accessing and/or using this Website, 
                  including the information, products, and services available through it, as well as submitting communications 
                  or User Content (as defined below), you agree to abide by the following terms and conditions outlined herein 
                  (the “Terms and Conditions”). 
                </Text>

                <Text color={textColorSecondary} fontSize="md" me="6px" mb="5px" mt={2} textAlign={'left'}>
                  These Terms and Conditions constitute a legally binding agreement between you and BOATS ON THE MARKET, 
                  its business divisions, and affiliates (“BOATS ON THE MARKET”, “us”, “our” or “we”). 
                  If you are advertising with us, you are also required to accept and comply with all terms and conditions 
                  stipulated in our Advertising Agreement. Thank you for your cooperation.
                </Text>
              </Box>
            </HStack>

            <Divider />

            <VStack align="start" spacing={4} mt={2}>
              <Heading textAlign={'center'} as='h4' size='md' fontWeight="bold">1. TERMS AND CONDITIONS:</Heading>

              <Text ml={4} my={0}>
                You are solely responsible for safeguarding the confidentiality of your password(s), if any, 
                which are assigned or used in connection with your usage of this Website. Please refer to our Privacy Policy
                for details regarding our data collection and usage practices, among other provisions. 
              </Text>

              <Text ml={4} my={0}>
                We retain the right to modify these Terms and Conditions, as well as our Privacy Policy from time to time, 
                by posting such changes on this Website or within the Privacy Policy section, as applicable. 
                Any alterations, amendments, additions, or deletions shall take effect immediately upon posting, 
                unless stated otherwise. 
              </Text>

              <Text ml={4} my={0}>
                We will not issue separate notifications regarding changes made, regardless of their significance, 
                thus we encourage you to periodically revisit and review these Terms and Conditions. 
                This ensures that you remain informed about the terms and conditions governing your access to and usage of 
                this Website, or our handling of any User Content you've submitted. Your continued use of this Website 
                and/or submission of User Content after such changes are posted implies your acknowledgment and acceptance 
                of said changes. This Website may undergo alterations, and we reserve the right to limit access to, 
                suspend, or terminate this Website, or any part thereof, at any given time. 
              </Text>

              <Text ml={4} my={0}>
                Furthermore, we retain the right to decline service, close accounts, and/or cancel orders at our discretion. 
                This includes situations where we believe customer conduct violates applicable laws or poses a 
                threat to the interests of Boats On The Market Group, its businesses, or its customers, affiliates, licensors, or licensees.
              </Text>
            </VStack>

            <VStack align="start" spacing={4} mt={2}>
              <Heading textAlign={'center'} as='h4' size='md' fontWeight="bold">
                2. INTELLECTUAL PROPERTY, LICENSES AND LIMITATIONS
              </Heading>

              <Text ml={4} my={0}>
                This Website and its entire content, including software, data, and information utilized for its operation, 
                encompassing text, images, presentation styles, source code, embedded routines, and programs, 
                are the rightful property of Boats On the Market, our affiliates, licensors, or licensees. 
              </Text>

              <Text ml={4} my={0}>
                They are safeguarded by global patent, copyright, trademark, and other applicable laws and treaties, 
                including those concerning trade secrets. We extend to you a restricted and nonexclusive right and license 
                to access or download a single copy of the content from this Website, strictly for your personal 
                and non-commercial use, and as necessary for utilizing any services offered through this Website. 
              </Text>

              <Text ml={4} my={0}>
                This Website contains specific trademarks and service marks owned by Boats On the Market, our owners, 
                affiliates, or others. You agree not to copy, use, or infringe upon these trademarks or service marks. 
                Moreover, you agree not to alter or remove any copyright, trademark, or other notices from any content 
                on this Website. Except as explicitly permitted within these Terms and Conditions, you are prohibited 
                from altering, distributing, reproducing, displaying, or utilizing this Website or any of its components. 
                Additionally, 
              </Text>

              <UnorderedList>
                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    (I) reproduction, re-transmission, or presentation in any form, either in whole or in part, 
                    of any content, programming code, images, or graphics contained within this Website is strictly 
                    prohibited without our prior express written consent; 
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    (II) you may not frame, overlay, or utilize other methods to enclose or exhibit this Website, 
                    or any trademark, logo, content, or proprietary information (including images, text, page layout, 
                    or form) contained herein, alongside any third-party software or content; 
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    (III) you may not employ any meta tags or "hidden text" utilizing the names or trademarks of 
                    Boats On the Market, our owners, affiliates, licensors, or licensees without our or their express 
                    written consent; and 
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    (IV) you may not attempt to decompile, disassemble, reverse engineer, or uncover any source code 
                    within this Website or the services provided herein.
                  </Text>
                </ListItem>
              </UnorderedList>

              <Text ml={4} my={0}>
                All rights not expressly granted to you by us in these Terms and Conditions are reserved by 
                Boats On the Market. You acknowledge that you do not acquire any ownership rights by accessing or 
                downloading any material, whether copyrighted or not, from this Website as authorized herein. 
              </Text>

              <Text ml={4} my={0}>
                In addition to, and not limited by, the above limitations and restrictions, you are explicitly prohibited 
                from employing automated means (including but not limited to spiders, robots, crawlers, scrapers, 
                deep-links, data-mining, data-gathering or extraction tools, and similar methods), or any other 
                automated methodology, algorithm, or device, or any manual process, to monitor, copy, download, 
                or access data or content from this Website for any purpose. 
              </Text>

              <Text ml={4} my={0}>
                However, a limited exception to these limitations and restrictions is provided to general-purpose 
                internet search engines and non-commercial public archives, which use such tools solely to gather 
                information for displaying hyperlinks to this Website, provided they adhere to our policies and procedures 
                and use identifiable agents from stable IP addresses.
              </Text>

            </VStack>

            <VStack align="start" spacing={4} mt={2}>
              <Heading textAlign={'center'} as='h4' size='md' fontWeight="bold">3. PROCEED AT YOUR OWN DISCRETION</Heading>

              <Text ml={4} my={0}>
                The material provided through this Website is intended for informational purposes only. 
                You are permitted to utilize the content, information, consumer reviews, data, and materials found on 
                this Website, as well as the products and services offered herein, solely for your personal and 
                non-commercial use. 
              </Text>

              <Text ml={4} my={0}>
                Prior to taking any action based on such content, information, consumer reviews, data, and materials, 
                or purchasing any products or services available through this Website, it is advisable to independently 
                verify any pertinent facts crucial to your decision-making process. SHOULD YOU CHOOSE TO RELY ON ANY 
                INFORMATION, PRODUCT, OR SERVICE AVAILABLE THROUGH THIS WEBSITE, YOU AGREE THAT YOU DO SO ENTIRELY AT 
                YOUR OWN RISK. YOU ACKNOWLEDGE THAT YOU BEAR SOLE RESPONSIBILITY FOR ANY DAMAGE OR LOSS THAT MAY RESULT 
                FROM YOUR UTILIZATION OF ANY INFORMATION, PRODUCT, OR SERVICE. Notwithstanding the above, in relation to 
                any classified advertising services provided on or accessible through this Website, please be aware that 
                we do not directly sell the advertised items and are not parties to any actual transaction between sellers and buyers. 
              </Text>

              <Text ml={4} my={0}>
                Additionally, we do not guarantee or insure any advertised item, transaction completion, or process payment.
                We do not act as an escrow service, transfer title, warehouse, store, ship, or deliver any advertised item. 
              </Text>
            </VStack>

            <VStack align="start" spacing={4} mt={2}>
              <Heading textAlign={'center'} as='h4' size='md' fontWeight="bold">4. YOUR ACCOUNT</Heading>

              <Text ml={4} my={0}>
                For the security of our website members' account information, Boats On the Market assigns each member a 
                unique user name, password, or ad ID number, as applicable. These distinctive identifiers are provided 
                to users via email immediately upon joining this website. Only members possess the ability to adjust 
                their personal details and remove their ads as necessary.
              </Text>

              <Text ml={4} my={0}>
                Upon becoming a member of this website, you are responsible for safeguarding the confidentiality of your 
                account and password and for limiting access to your computer. You agree to accept sole responsibility 
                for any and all activities occurring under your account or password. 
              </Text>

              <Text ml={4} my={0}>
                Promptly notify us of any unauthorized use of your account or password or any security breach you become 
                aware of. You may be held accountable for any losses incurred by us or any other user or visitor to this 
                website due to someone else using your account or password. Refer to our Privacy Policy for further 
                details regarding your account or password.
              </Text>

              <Text ml={4} my={0}>
                To become a member of this website or to purchase products or services from our members, you must be at 
                least eighteen (18) years old and use a debit/credit card. We reserve the right to decline service, 
                deactivate accounts, remove or edit content, or cancel orders at our sole discretion.
              </Text>
            </VStack>

            <VStack align="start" spacing={4} mt={2}>
              <Heading textAlign={'center'} as='h4' size='md' fontWeight="bold">5. CONNECTIONS AND LINKS:</Heading>

              <Text ml={4} my={0}>
                On occasion, this Website may feature connections or references to external sites that we do not administer. 
                These links may redirect you away from our Website or open an additional browser tab, allowing access to third-party 
                content. Please note that these links are provided solely as a convenience for our Website users, and their inclusion 
                does not constitute an endorsement by Boats On the Market of the linked sites or their contents. 
              </Text>

              <Text ml={4} my={0}>
                Boats On the Market assumes no responsibility for your interaction with these linked websites, and your 
                access and utilization of any third-party sites linked to ours are undertaken at your own risk. 
              </Text>

              <Text ml={4} my={0}>
                Furthermore, Boats On the Market bears no liability for the content of these third-party sites and shall 
                not be held responsible for any damages or harm arising from your engagement with such content or your 
                use of, reliance on, or access to these external sites. We encourage you to review the specific 
                terms of use and privacy policies of any third-party websites for further information.
              </Text>
            </VStack>

            <VStack align="start" spacing={4} mt={2}>
              <Heading textAlign={'left'} as='h4' size='md' fontWeight="bold">6. PROTECTIONS OF DATA:</Heading>

              <Text ml={4} my={0}>
                We employ a comprehensive range of measures, both physical and electronic, along with stringent managerial 
                protocols, aimed at safeguarding and deterring unauthorized access to, maintaining the security of, 
                and responsibly utilizing the data collected online. 
              </Text>

              <Text ml={4} my={0}>
                Despite our diligent efforts to ensure the confidentiality of your private information acquired through 
                your interactions with this Website, it is important to acknowledge that we cannot provide an absolute 
                guarantee of the complete safety and security of confidential data on the Internet.
              </Text>
            </VStack>

            <VStack align="start" spacing={4} mt={2}>
              <Heading textAlign={'center'} as='h4' size='md' fontWeight="bold">7. INFORMATION GATHERING AND UTILIZATION:</Heading>

              <Text ml={4} my={0}>
                Any personally identifiable information you furnish via electronic communications to Boats On the Market is 
                regulated by our Privacy Policy. For a thorough understanding of how we collect and utilize personally 
                identifiable information and other data, we encourage you to review our Privacy Policy, which is seamlessly 
                integrated into these Terms and Conditions by reference.
              </Text>
            </VStack>

            <VStack align="start" spacing={4} mt={2}>
              <Heading textAlign={'center'} as='h4' size='md' fontWeight="bold">8. CONTENT CONTRIBUTION:</Heading>

              <Text ml={4} my={0}>
                You have the opportunity to contribute content and information, encompassing consumer reviews, opinions, 
                ideas, inventions, techniques, expertise, data, materials, or other submissions (collectively referred to 
                as "User Content"), via this Website. Whether through posting in public forums like blogs or message boards 
                or by submitting via email or other electronic communication methods facilitated by Boats On the Market, 
                you can share your insights. 
              </Text>

              <Text ml={4} my={0}>
                By providing such User Content, you grant Boats On the Market, along with our owners, affiliates, and 
                licensees, a royalty-free, perpetual, irrevocable, non-exclusive license to utilize, modify, adapt, 
                aggregate, translate, create derivative works from, publicly display, publicly perform, and distribute 
                your User Content worldwide. Furthermore, you authorize the use of your name in connection with your 
                submissions, if deemed suitable by Boats On the Market and its affiliates. 
              </Text>

              <Text ml={4} my={0}>
                You affirm that you own or have control over all rights to the User Content, ensuring its accuracy and 
                compliance with these Terms and Conditions, while also ensuring it doesn't cause harm to any individual 
                or entity. Additionally, you permit other users of this Website to access, view, store, or reproduce your 
                User Content for personal use, including potential disclosure to third parties. By sharing such User 
                Content, you waive any claims of misappropriation by Boats On the Market or its affiliates.
              </Text>
            </VStack>

            <VStack align="start" spacing={4} mt={2}>
              <Heading textAlign={'center'} as='h4' size='md' fontWeight="bold">
                9. UTILIZATION OF INTERACTION SERVICES AND COMMUNICATIONS
              </Heading>

              <Text ml={4} my={0}>
                Within this Website, we offer various services enabling direct interaction among users, encompassing 
                email services, blogging platforms, chat rooms, communication tools, forums, and other public posting 
                arenas ("Interaction Services"). It should be noted that any reference to this Website in these 
                Terms and Conditions generally includes all available Interaction Services. While we cannot undertake 
                the review of every submission within these Interaction Services beforehand, you may often encounter 
                postings before our staff does. These platforms are expected to host diverse information and opinions 
                from various individuals and entities beyond our control. 
              </Text>

              <Text ml={4} my={0}>
                We do not endorse or guarantee the accuracy of any content posted, regardless of its source, be it a user, 
                celebrity, expert guest, or our staff member. 
              </Text>

              <Text ml={4} my={0}>
                We disclaim responsibility for, and absolve ourselves from liability associated with, the views and 
                opinions expressed within these platforms. While fostering an open exchange of information and User 
                Content, we aim to ensure a positive experience for all users.
              </Text>

              <Text ml={4} my={0}>
                In the ordinary course of business, we do not monitor private electronic messages not directed to us. 
                Nevertheless, we retain the right to do so and leverage any available information resulting from your 
                interaction with this Website and any Interaction Services (including, for example, reverse IP address 
                inquiry) to comply with the law, enforce these Terms and Conditions, or safeguard the rights, property, 
                or safety of this Website's visitors, users of any Interaction Services, our customers, the public, 
                or Boats On the Market and its affiliates, licensors, or licensees. 
              </Text>

              <Text ml={4} my={0}>
                We reserve the discretion to review the content posted on this Website, including blogs, message boards, 
                chat rooms, listings, forums, and other User Content, to ensure compliance with these Terms and Conditions 
                and any other regulations established by us, and to meet any legal, regulatory, or government requirements. 
              </Text>

              <Text ml={4} my={0}>
                We retain the right, at our sole discretion, to delete, relocate, decline to post, or edit any messages, 
                listings, posts, or other User Content deemed unacceptable or inappropriate, whether for legal or other reasons.
              </Text>

              <Text ml={4} my={0}>
                By accessing this Website and/or utilizing any Interaction Services, you agree not to post, submit, 
                or transmit to Boats On the Market through this Website or any Interaction Services any User Content 
                or other information that: 
              </Text>

              <UnorderedList>
                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    (I)  infringes upon the rights of others; 
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    (II) is unlawful, threatening, abusive, defamatory, invasive of privacy or publicity rights, vulgar, 
                    obscene, profane, misleading, fraudulent, or otherwise objectionable; 
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    (III) incites conduct constituting a criminal offense or civil liability or otherwise violates any law;  
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    (IV) contains advertising or solicitation without our express prior approval concerning products or services;
                  </Text>
                </ListItem>
              </UnorderedList>

              <Text ml={4} my={0}>
                The sender of any User Content to this Website or via any Interaction Services, or otherwise to 
                Boats On the Market, is solely responsible for the content and information contained therein, including 
                its accuracy and truthfulness. 
              </Text>

              <Text ml={4} my={0}>
                By posting on this Website or via any Interaction Services, or otherwise submitting User Content to 
                Boats On the Market, you affirm that you possess all necessary rights to provide, post, upload, 
                or submit such User Content. 
              </Text>

              <Text ml={4} my={0}>
                Without limitation, you shall bear sole liability for any harm resulting from copyright, trademark, 
                or other proprietary rights infringement or any other damage resulting from User Content submitted 
                by you through this Website or any Interaction Services. We reserve the right to deny access to this 
                Website and/or any Interaction Service to individuals who violate these Terms and Conditions or who, 
                in our judgment, disrupt others' enjoyment of this Website or Interaction Services, 
                or infringe upon others' rights. We will comply with legal requirements regarding the disclosure 
                of messages to others, including law enforcement agencies.
              </Text>
            </VStack>

            <VStack align="start" spacing={4} mt={2}>
              <Heading textAlign={'center'} as='h4' size='md' fontWeight="bold">
                10. NOTICE OF COPYRIGHT INFRIGEMENT CLAIMS
              </Heading>

              <Text ml={4} my={0}>
                At Boats On The Market, we hold the rights of all copyright holders in high regard, and as such, 
                we have implemented a policy to facilitate the removal of content from this Website under specific 
                circumstances. If you believe that your work has been unlawfully copied in a manner constituting copyright 
                infringement, we urge you to reach out to Boats On The Market.
              </Text>

              <Text ml={4} my={0}>
                To assist us in processing your claim efficiently, please include the following information required 
                by the Digital Millennium Copyright Act, 17 U.S.C. 512:
              </Text>

              <UnorderedList>
                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    (I)  A physical or electronic signature of an individual authorized to act on behalf of the owner 
                    of the allegedly infringed exclusive right;
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    (II) Identification of the copyrighted work alleged to have been infringed, or, if multiple copyrighted 
                    works on a single online site are involved, a representative list of such works on that site; 
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    (III) Identification of the material claimed to be infringing or the subject of infringing activity, 
                    along with information reasonably sufficient to enable us to locate the material;  
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    (IV) Information reasonably sufficient to allow us to contact the complaining party 
                    (e.g., address, telephone number, and email address);
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    (V) A statement by the complaining party affirming a good faith belief that the material's use 
                    is unauthorized; and
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    (VI) A statement affirming, under penalty of perjury, that the information provided in the notification
                    is accurate and that the complaining party is authorized to act on behalf of the owner of an allegedly
                    infringed exclusive right.
                  </Text>
                </ListItem>
              </UnorderedList>

              <Text ml={4} my={0}>
                The sender of any User Content to this Website or via any Interaction Services, or otherwise to 
                Boats On the Market, is solely responsible for the content and information contained therein, including 
                its accuracy and truthfulness. 
              </Text>

              <Text ml={4} my={0}>
                By posting on this Website or via any Interaction Services, or otherwise submitting User Content to 
                Boats On the Market, you affirm that you possess all necessary rights to provide, post, upload, 
                or submit such User Content. 
              </Text>

              <Text ml={4} my={0}>
                Without limitation, you shall bear sole liability for any harm resulting from copyright, trademark, 
                or other proprietary rights infringement or any other damage resulting from User Content submitted 
                by you through this Website or any Interaction Services. We reserve the right to deny access to this 
                Website and/or any Interaction Service to individuals who violate these Terms and Conditions or who, 
                in our judgment, disrupt others' enjoyment of this Website or Interaction Services, 
                or infringe upon others' rights. We will comply with legal requirements regarding the disclosure 
                of messages to others, including law enforcement agencies.
              </Text>
            </VStack>

            <VStack align="start" spacing={4} mt={2}>
              <Heading textAlign={'center'} as='h4' size='md' fontWeight="bold">
                11. BREACH OF THESE TERMS AND CONDITIONS
              </Heading>

              <Text ml={4} my={0}>
                In the event that we suspect any violation of these Terms and Conditions on your part, we reserve the 
                right to disclose any relevant information we possess, including your identity. 
              </Text>

              <Text ml={4} my={0}>
                Such disclosure may be deemed necessary to investigate any complaints regarding your utilization of 
                this Website, or to initiate contact or legal proceedings against you or any other individual who may 
                be causing harm or disruption to our rights, the rights of our visitors or users of this Website, 
                or our customers, whether intentionally or unintentionally. 
              </Text>

              <Text ml={4} my={0}>
                We retain the discretion to disclose any information we deem essential to comply with applicable laws, 
                regulations, legal processes, or governmental requests. Additionally, we may disclose your information 
                if we determine it reasonably necessary to:
              </Text>

              <UnorderedList>
                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    (I) adhere to legal obligations,
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    (II) enforce these Terms and Conditions, 
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    (III) address claims that your data breaches the rights of others, or 
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    (IV) safeguard the rights, property, or safety of Boats On the Market, 
                    our owners, affiliates, employees, users, visitors, or the general public.
                  </Text>
                </ListItem>
              </UnorderedList>

              <Text ml={4} my={0}>
                By using this Website, you acknowledge and accept that we reserve the right, at our sole discretion 
                and without prior notice, to revoke your access to this Website and/or prevent your future access 
                if we determine that you have violated these Terms and Conditions or any associated agreements or 
                guidelines, including our Privacy Policy. 
              </Text>

              <Text ml={4} my={0}>
                You further agree that any breach of these Terms and Conditions by you constitutes an unlawful and 
                unjust business practice, leading to irreparable harm to us. In such instances, monetary damages 
                would be insufficient, and you consent to our pursuit of any injunctive or equitable relief we 
                consider necessary or appropriate. These remedies supplement any other legal or equitable remedies 
                available to us.
              </Text>
            </VStack>

            <VStack align="start" spacing={4} mt={2}>
              <Heading textAlign={'center'} as='h4' size='md' fontWeight="bold">
                12. WARRANTY DISCLAIMER
              </Heading>

              <Text ml={4} my={0}>
                By utilizing this Website, you acknowledge and agree that all information, products, or services offered 
                through this Website are provided by us on an "as is," "as available" basis, without any warranties, 
                either express or implied. Your use of this Website and all its contents, including information, products, 
                or services, is entirely at your own risk. 
              </Text>

              <Text ml={4} my={0}>
                It is understood that there may be delays, interruptions, inaccuracies, or other issues with the 
                information, products, and services presented on this Website. Boats On the Market, along with our owners, 
                affiliates, licensors, or licensees, do not warrant that this Website will be uninterrupted or error-free. 
              </Text>

              <Text ml={4} my={0}>
                We and our affiliates do not guarantee the accuracy, reliability, or completeness of the content or any 
                information, product, or service provided through this Website. Without limiting the foregoing, 
                Boats On the Market, our owners, affiliates, licensors, and licensees explicitly disclaim all warranties, 
                whether express or implied, including but not limited to warranties of merchantability, fitness for a 
                particular purpose, and non-infringement, as permitted by law.
              </Text>
            </VStack>

            <VStack align="start" spacing={4} mt={2}>
              <Heading textAlign={'center'} as='h4' size='md' fontWeight="bold">
                13. LIABILITY LIMITATION
              </Heading>

              <Text ml={4} my={0}>
                Boats On the Market, along with our owners, affiliates, licensors, and licensees, shall not be held liable 
                for any errors, inaccuracies, omissions, or other defects in the information provided on this Website. 
              </Text>

              <Text ml={4} my={0}>
                Under no circumstances shall Boats On the Market or any of our owners, affiliates, licensors, 
                or licensees be liable to you or anyone else for any damages, except for direct damages, resulting 
                from your access to or use of, or inability to use, this Website or any information, products, 
                or services available through it, or our utilization of any User Content that you provide to us. 
              </Text>

              <Text ml={4} my={0}>
                Moreover, in addition to the aforementioned limitation of liability, Boats On the Market, our owners, 
                affiliates, licensors, or licensees shall not be liable to you or any other party for any special, 
                indirect, consequential, punitive, exemplary, or similar damages whatsoever, including but not limited 
                to lost revenues, profits, business, or data, even if we or any other party has been advised of the 
                possibility of such damages. 
              </Text>

              <Text ml={4} my={0}>
                You agree that the total aggregate liability, if any, of Boats On the Market and our owners, affiliates, 
                licensors, and licensees arising from any legal claim (whether in contract, tort, or under any other 
                legal theory) related to your access to or use of this Website or any information, products, or services 
                available through it, or our use of any User Content you provide, shall not exceed one hundred dollars 
                ($100). Please note that some jurisdictions may not permit the exclusion or limitation of liability for 
                consequential or incidental damages, so certain limitations mentioned here may not apply to you.
              </Text>

              <Text ml={4} my={0}>
                Using this Website for spamming is strictly prohibited. By accessing and using this Website, 
                you agree not to utilize information regarding other users or any items listed or searched for on this 
                Website for any purpose not expressly permitted by these Terms and Conditions. 
              </Text>

              <Text ml={4} my={0}>
                Furthermore, you are prohibited from posting information directed to or collecting personal information 
                from minors. These Terms and Conditions are governed by the laws of the State of Florida, U.S.A. 
                You consent to the exclusive jurisdiction and venue of the state and federal courts located in Miami-Dade 
                County, Florida, U.S.A., for any disputes arising from or relating to these Terms and Conditions, 
                your use of this Website, or the information, products, or services available through it, including 
                any User Content you post or submit. 
              </Text>

              <Text ml={4} my={0}>
                Use of this Website or its content is not authorized in any jurisdiction that does not uphold all 
                provisions of these Terms and Conditions. 
              </Text>

              <Text ml={4} my={0}>
                You acknowledge that no joint venture, partnership, employment, or agency relationship exists between 
                you and Boats On the Market as a result of these Terms and Conditions or your use of this Website. 
              </Text>

              <Text ml={4} my={0}>
                All notices, disclosures, and other communications provided to you electronically fulfill any legal 
                requirement for written communication. You agree to use this Website and its content for lawful purposes only. 
              </Text>

              <Text ml={4} my={0}>
                Any conduct that we deem to restrict or inhibit others from using or enjoying this Website will not be permitted.  
              </Text>

              <Text ml={4} my={0}>
                You agree that any disputes arising from or related to this Website or its content will be resolved individually, 
                without resorting to any form of class action. 
              </Text>

              <Text ml={4} my={0}>
                You further agree not to post, upload, or transmit any content, materials, or information involving 
                boats or other vessels located in countries or regions subject to U.S. or EU comprehensive 
                economic sanctions including, without limitation, Iran, North Korea, Syria, Cuba, Sudan and the 
                Crimea region of Ukraine or involving individuals or entities designated on restricted party lists 
                under applicable laws related to economic sanctions or export control laws. 
              </Text>

              <Text ml={4} my={0}>
                Boats On the Market reserves the right to remove any violative listings. If any provision of these Terms 
                and Conditions is found to be unenforceable by a court of competent jurisdiction, the remaining provisions 
                shall remain in full force and effect.
              </Text>

              <Text ml={4} my={0}>
                Boats On the Market's failure to enforce any provision of these Terms and Conditions will not constitute 
                a waiver of future enforcement. These Terms and Conditions, along with our Privacy Policy, 
                constitute the entire agreement between the parties regarding the subject matter herein. Additional 
                terms and conditions may apply when using or purchasing specific products or services from Boats On the Market.
              </Text>
            </VStack>

            <VStack align="start" spacing={4} mt={2}>
              <Heading textAlign={'center'} as='h4' size='md' fontWeight="bold">
                14. REALISE AND IDENTIFICATION
              </Heading>

              <Text ml={4} my={0}>
                By using this Website, you agree to release and indemnify Boats On the Market, along with our owners, 
                affiliates, licensors, and licensees, from any and all claims, costs, demands, losses, 
                damages, and expenses, including attorney’s fees, arising from or related to several circumstances: 
              </Text>

              <UnorderedList>
                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    (I) Any breach of these Terms and Conditions by you or any matter for which you are responsible 
                    or liable under these Terms and Conditions. 
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    (II) Third-party claims regarding our use of any User Content you have posted on this Website 
                    or submitted to us, including but not limited to claims of copyright, trademark, trade secret, 
                    patent, proprietary rights, or any other claims. 
                  </Text>
                </ListItem>

                <ListItem ml={20}>
                  <Text fontWeight="bold" color={textColorPrimary}>
                    (III) Disputes between you and any third party, including other users, advertisers, or parties 
                    involved in any actual, prospective, or terminated sale or transaction. If you are a California resident, 
                    you waive California Civil Code Section 1542, which states: 
                  </Text>
                </ListItem>
              </UnorderedList>

              <Text ml={4} my={0}>
                A general release does not extend to claims that the creditor does not know or suspect to exist in their 
                favor at the time of executing the release, which, if known, would have materially affected the settlement 
                with the debtor.
              </Text>

              <Text ml={4} my={0}>
                Using this Website for spamming is strictly prohibited. By accessing and using this Website, 
                you agree not to utilize information regarding other users or any items listed or searched for on this 
                Website for any purpose not expressly permitted by these Terms and Conditions. 
              </Text>

              <Text ml={4} my={0}>
                Furthermore, you are prohibited from posting information directed to or collecting personal information 
                from minors. These Terms and Conditions are governed by the laws of the State of Florida, U.S.A. 
                You consent to the exclusive jurisdiction and venue of the state and federal courts located in Miami-Dade 
                County, Florida, U.S.A., for any disputes arising from or relating to these Terms and Conditions, 
                your use of this Website, or the information, products, or services available through it, 
                including any User Content you post or submit. 
              </Text>

              <Text ml={4} my={0}>
                Use of this Website or its content is not authorized in any jurisdiction that does not uphold all 
                provisions of these Terms and Conditions. 
              </Text>

              <Text ml={4} my={0}>
                You acknowledge that no joint venture, partnership, employment, or agency relationship exists 
                between you and Boats On the Market as a result of these Terms and Conditions or your use of this Website. 
              </Text>

              <Text ml={4} my={0}>
                All notices, disclosures, and other communications provided to you electronically fulfill any 
                legal requirement for written communication. You agree to use this Website and its content for 
                lawful purposes only. Any conduct that we deem to restrict or inhibit others from using or enjoying 
                this Website will not be permitted. 
              </Text>

              <Text ml={4} my={0}>
                You agree that any disputes arising from or related to this Website or its content will be resolved 
                individually, without resorting to any form of class action. 
              </Text>

              <Text ml={4} my={0}>
                You further agree not to post, upload, or transmit any content, materials, or information involving boats 
                or other vessels located in countries or regions subject to U.S. or EU comprehensive economic sanctions 
                or involving individuals or entities designated on restricted party lists under applicable laws related 
                to economic sanctions or export control laws. 
              </Text>

              <Text ml={4} my={0}>
                Boats On the Market reserves the right to remove any violative listings. If any provision of these:
              </Text>

              <Text ml={4} my={0}>
                Terms and Conditions is found to be unenforceable by a court of competent jurisdiction, the remaining 
                provisions shall remain in full force and effect. Boats On the Market's failure to enforce any provision 
                of these Terms and Conditions will not constitute a waiver of future enforcement. 
              </Text>

              <Text ml={4} my={0}>
                These Terms and Conditions, along with our Privacy Policy, constitute the entire agreement between 
                the parties regarding the subject matter herein. Additional terms and conditions may apply when using 
                or purchasing specific products or services from Boats On the Market.
              </Text>
            </VStack>
          </SimpleGrid>
        </Card>
      </Flex>

      <Footer />
    </Flex>
  )
}
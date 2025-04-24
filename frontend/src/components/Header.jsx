import React, { useState, useEffect, useRef } from 'react';
import { Bitcoin, Car, Video, UserRound, Plane, Building2, Stethoscope, Shield, Globe, ArrowRight, Check, ChevronRight, Heart, Phone, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [floatingPosition, setFloatingPosition] = useState(0);
  const floatingElementRef = useRef(null);
  const targetSectionRef = useRef(null);
  const mobileFrameRef = useRef(null);
  const frameAttachmentRef = useRef(null);
  const navigate = useNavigate();
  
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollPosition / maxScroll, 1);
      
      setScrolled(scrollPosition > 50);
      setScrollProgress(progress);
      
      // Calculate floating position for the consultation card
      if (floatingElementRef.current && targetSectionRef.current) {
        const startPosition = 300;
        const targetPosition = targetSectionRef.current.getBoundingClientRect().top + window.scrollY - 100;
        
        if (scrollPosition < startPosition) {
          setFloatingPosition(0);
        } else if (scrollPosition >= startPosition && scrollPosition <= targetPosition) {
          const progress = (scrollPosition - startPosition) / (targetPosition - startPosition);
          const floatAmount = 100 * progress;
          setFloatingPosition(floatAmount);
        } else {
          setFloatingPosition(100);
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tabs = [
    { icon: <Car />, label: "Transport" },
    { icon: <Building2 />, label: "Facilities" },
    { icon: <UserRound />, label: "Support" },
    { icon: <Bitcoin />, label: "Payments" },
    { icon: <Video />, label: "Remote Call" }
  ];

  const tabContent = [
    {
      title: "Smart Transportation Network",
      description: "Door-to-door service with professional drivers, medical vehicles, and real-time tracking. Priority lanes for medical emergencies and custom accessibility options.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPto8sr_h8qtzrftyNVzrPP8ek_CQG3i8blQ&s",
      stats: [
        { value: "24/7", label: "Service" },
        { value: "5min", label: "Response" },
        { value: "100%", label: "Sanitized" }
      ]
    },
    {
      title: "World-Class Medical Facilities",
      description: "Access to a global network of JCI-accredited hospitals, specialized clinics, and recovery centers equipped with cutting-edge technology and staffed by leading specialists.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJrvIOMbasCiVlciryQYKEWPC_nmQ-qClTRw&s",
      stats: [
        { value: "500+", label: "Hospitals" },
        { value: "50+", label: "Countries" },
        { value: "A+++", label: "Rated" }
      ]
    },
    {
      title: "Personalized Care Concierge",
      description: "Dedicated medical coordinators handle everything from appointment scheduling to translation services, dietary requirements, and cultural considerations.",
      image: "data:image/jpeg;base64,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",
      stats: [
        { value: "24/7", label: "Support" },
        { value: "15+", label: "Languages" },
        { value: "100%", label: "Customized" }
      ]
    },
    {
      title: "Transparent Financial Solutions",
      description: "Clear pricing with no hidden fees, flexible payment options including cryptocurrency, and assistance with insurance claims and reimbursement procedures.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqLKz3EsdpDVPhzCDW_QSHPEkYunuruBCoTw&s",
      stats: [
        { value: "100%", label: "Transparent" },
        { value: "12+", label: "Currencies" },
        { value: "Secure", label: "Blockchain" }
      ]
    },
    {
      title: "Virtual Doctor Consultations",
      description: "Connect with world-class specialists through secure, high-definition video calls from anywhere. Get expert opinions, follow-up consultations, and immediate care without travel.",
      image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhAVFhUWGBUVFRUVFRYVFxUYFxUWFxUVFxYYHiggGBolHRUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGhAQGy0mHyUtLS0tLS0tLS0vLS0tLS0tLS8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALYBFAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAFAAIDBAYHAQj/xABKEAABAwEFBAcDCAgEBAcAAAABAAIRAwQFEiExQVFhcQYTIoGRobEHMsEjQlJygrLR8BQzVGKiwtLhF0OT8RUWkrQkJTRTY3Ti/8QAGQEAAwEBAQAAAAAAAAAAAAAAAQIDAAQF/8QAJhEAAgICAgICAgIDAAAAAAAAAAECEQMhEjFBUQQTInEyYSORsf/aAAwDAQACEQMRAD8A7gSsaW/Ln638xWxhZOPlzz/mKDCjU02rPX035Y8h6LRNeN48UAvlwNUwdgQl0ZFABOCQXoUxgVeVreXijTdBjE921rdABxMHuCjpU3MeA1x0nMk5yNZTKNPFWtE/Sa2RkQBTbEeJUllp1OscXGWhoDToTmSZ8kwA7Z3Ymhw5HgQvSE27/cP1slIUGFDYXkJ6aUAhC6PndyIwh9zj3u5E4TroRjCEOvAZd4RJyHXhp3hFmRNd8zkEQz4eqpXfqVfRRmMIO8eH91G6mZHaOvDceCnTXbOfwKIDzq+J8Y9EuqH+5J9U9JYwzqW/RHgFnqw05haRZy0bOaDCieye8ObfVGgEGsg7Xe37wRtZGYkkkkQEdH531ipFHR+d9Y+gUixhpKQC9herGMraW9p31j6lQEK1ah23fWd6lQEKDKEJavFIQklCbCFlMA64jZMfxFaxZb/PP1j94roZNGlp02jQDwQK+x8r3D4o+xAL7/W9w+KEujLsoL1IJwCmOB7ZRLKpqCcLwA6NjhkDyIy7lYY+cm5nLkiBYkymBojYCWkA1oaPyV6vAksY9XhXq8KBglc3zu5EihtzfO7kTTroV9jCEOvD4j1RMoZeHxHqizIsWA5lXgVRsAzKvhFGYk12zmnJrtnNEA5JJJYwlnrQ373xWhQS1DTn8UGFD6DCCJ3t+8EYQymMx9n7wRNZGYkkk0lEA2lq763wCkUNHV3P4BTLGEkkksYzNq9931nepUJCsWr33/Wd6lQEKLKEZCScklCa1AQ0CocpJce1t1R5Z1zj1xHE/eV2TQfackBvr9Z3D4o6zRBL6Hyn2R8UJdGXZQATgvAvQpjHqcvAvVgiXoXicFgHq8XqSJgjc3zu5E0Nuf53d8URJTroVnjihtuHqERhUbcPULMyJrCMyrqp2LUq4mRmJNds5py5r7Tr9qCoLPTeWNaJeWkglxGQJGwD1WMkaS+Om9koVOrLi9w94sghsbCZ14CYVY+0CyBuIYjlkBEnhBK4rUq8fBRGtuWoNHYKntLpAjsAgkSAXEtG3OBJG4COKMUr1o1Q1zKre0cgXAOOekLgvXTrkVfs1uLCGnNp2HTL4oNMZJHfKOve37wRVZPofa+tot7RJbAlxkxIIk7csp4LUl43hCLtWLJU6PSUgE0OG8eSd1g3jxTCjaeruf8AK1SKGnVbLu0Nd/7oT+tb9IeIWMPSTOub9IeITTWb9IeIWMZ+1e+/6zvUqJS2ky927EfUqNRZRDYXickhQTVLOO/XHfJ+8VowgDh8t3n7ysyaDVKYGQQW+Z6zPcPisdW9tFkaS1lnrvaMg/5NodHzgC6YPHNB7y9sNne7ELJV0A99nFFxdBSN2vQubn2vUP2Wp/1sTf8AGCh+yVP9RiX65eg0dLTlzP8Axhofsj/9Vn4Jw9r1H9kd/rN/pW+qXox0wL1c0Htdpfsh767R/KvP8YKX7If9dv8AQt9U/RjpqSx9m6eMeAf0ciRP60f0q6zpY0/5P8f/AOUfpn6E+yPs2l0fO7viiMLEWLpgynM0tY/zBl/CpKvtGszfewd1SfRqZY5IHJM2cKjbR8EL6MdMaFue+nSnExuI7iJg6gbSPFFrXnOehE8NqVqhkPsrc1bw/mSqtm1VoomY0gfklcV9p9pBtbw2MgBPECCum370kp0GVSG1XOpw04aVQta4tBEvw4dHNOu0b1xrpNaOs+UwPbsJcIk8pSt7Q8Y2mzP1HKEvz1TXOUUqtALBrbD+eSt2R4JAObTt+id6G088iprO8sdpPDeIQktDI7H0GtYY7q3bIB5HQ8tF0QUxuC4Lct9QWbHNEA/SbsB9F2647wFak1wMmBK5sTabiymeNpSRfwjcEsI3L1JXOYjptEuy2/yhPTKZzdz/AJQnErGESkAkAnLGM3a/ff8AWd6qJS2v33/Wd6qJSKISSSSATSUasgdkid6C0+1U4yQR3p1G9RTbSBqBxcIwgyRAzg7Y4p9Ig1ARtM+ap5IpnG/Y3YKVSpaW1aNOoGto4cbGvwwagMYgY2eAXRXXVZ2OrA2WzkENwfI0wWjDn83POSsB7H3xbbYzc0/w1SPiuo2qwYyDMYzhkF2xpOefAp5fyGkDrbdtCWO/RqIkEQKTNh5cUE6SXjRseCLEx+KZPVtDQBskNOa0FqszqVLrcZcWuLYdnHaInPTReWOuK7e3TYYOhY13fmFN3ZkTXXQo1GMebMxpcAcJYyRI00VO/r0stjp46lOnJBLWBrQXREnTIZjPiEcoEyAIAyyAAQS8Lop1bTTq1AC2lTcYdpqc/GEL0NFWzB3h0pvCuP8Aw1jbSZOThSDnH7ThHgEV6IdMHB5s9vpNY4kFjy2Nvaa7F3EHmNy1DLbScXYDAbrLXN7xIzCx3SbBacBp4g5j2Oa+CMQxAGD3z3JFl3VF5YlVnUTTGxo8Aq/creHYqFRiqcpKOSbjEHMeI3H+yC2onrInKBl3lT1bI3H7oyqMHcaWnimSAZ3oU/8A8/to30J8rKfiVqb1n9IqNbDXzSrMOmKGdWcW8S0t4YgdiyXRAxf9b96zejaP9K2PTJhaKVob/lvh/Gm/JwO/OB3lJn3Gzpwup/sv3ZeYqVGtiA5mITria4tqMI2EdnxRpY2k1wfiZJhwcTr2mwJ+3SM8xxWxaZzSYZuS2DPjUWmgPfburp1zhltRoH2iMBkbsOHTcVyHpjT+TkbD+K7beVjFamaZJExmNhBkLk3S27XgVKREuadm2IIjmIQy2pJ+BsFOLXk5g92aY4qe1UoKrhn5/Oi607RNqhzBt5qZr8wdo/JVZ78suKTXLNGQUpiQCNmR5TkfOO5dJ9nV6V2gBrmvYPea8kFo4OEyOe5cusNsLXCTkuidEKzWdtuR4e7ycCuL5EnFo6sUVJM6/ZLUKjQ4TyOoIyIPep5Qa5a4LTBGuIQZyOpRkK0JclZxzjxlRHS1dz+AUkJlPV3P4BPTiCleqPEnBYxnLSe276zvVRp9pPbd9Y+qjUih7KSSSAQrZbBZ8IDKYEZggQZiJnkm0mQ4CZjb3pMfhaNc1GK4xKqJpJHHPZk7De9sZ+7af4bVTHxK7A+s0dWCdHZ67Wu/Fce6Buw37am//c/7hp+C61aqWYPI+CaXZpEN7VWmz1AD/mE+Lp+KHXFoefwCvvo42lpBhxk+X4KSyWVtIENZxzMpJbAi1Q1HMJtemDiByyInvmPJQ2i9OqexrmgYgXiBOQIn1CbaLU0uwF0OqF2EbTGZPADfpmN4StWqQ8XTtgBzLNTbVwsAxggkN97ZGWs+aHMoUnUwaTIcezAEOnYiNsszWhwa4tJJJ7RE908EJuy86VkqU3Pa7AHuBLczLmuLqjp1AzJ7+S51G2kdjlUWzpLRpvVR7cypaVpY8BzHhwIkEGZWNv8AttRlWrTDjEuIO0Ys8jwnJdiR50nQZttmdjBAkRvG9Daza7iYLpxNIzA0yCuUMxKnpa+HqEOQaMl0dlt/sB1NmIO+cJn7i13Sq01BUNF4HVV2Yabtjagk4XHicJ5cisnSdh6SWdv0qVQfwWn+ldF6R2AV6L6WhIBadzgZafzsJQypuOi2OSjJNgPo3aHOpgO1a4tnQgj5rhs/Fa6yvlvJc0uO+X0alSnaQQ4ZOJ17O128xGe2BzO0uu82uaHMIcDuK5MM+L2dOfG5bQdWB6cMw2gGfeYDG6CR36LbC0SAQJQi+7kp2stLy5jmiA5u0awQdV0ZFzjo5sUuE9nHbzuUVXSwgHPkeCx9ss7qbixwjmu4WrolgbUcytODY5oGLKSAQdnLasned1067Ye3MaHQhRhllidS6Otxjk3E5gDBhe6I3eXR2oyS0yOOqEuouw5tIIMA/BdccsZbRB42h7HCBnoZ7jH571vLitbWZOzY+DlsnI98z4rnzGyJGoOnqFpujDg5/VPdB0YSYid47/Vc/wAqPKN+i+B0zp1xVgHwT2c8LpMgGO0CMxxGXgtvZajmkNccWWTshMbCAuRdHb0c2q6k4Elri0xtgxmPFdQsNpBgHsxnnlnEfFc/x58XxZvkwvaCtM5nn8ApFC3bzXocu8889C9xJsryVgmetB7bvrO9SmhOr++76x9SvApjo9SXi9QCFheNJgwpv/E6J2+S5LW6SOc9pd2sLjGUZFaG77ypVh2XQdxMEJVnT0T0Yvou4DpJaQNHPtcciS8LslQaclxG4zh6SxvfVB77K5y7cZ7OQiMzK6J+P0FkbjhaTtAmEEr257arTJwOAdhneJIHdPgi9v7IxgiJaHbYGhQQ0jijIgOBDtd8gcMvNc+SVPR0YUqdhu33YyqadVz4bTpuyA94HCddmTfNBrjqONU1Kpg2qmRRJyDML3FtIfRJZgdG0h25E6NtHUlsjEzsxtiDhPhl9lV71szzY3BgmqAH08wIqBwcwgnIQfiurDONte+2c2TG0r9PRTqVWVABUGZkicpjJw4OBEEbD4rOXqxhp13YezTYRH71U9W0eGMd61V8XU1orVw5+bcTqeIYBnL3NylpMucTOoWMt9PHgptMhpDjvdUIjtHgCNNuJLh+NyzxiurKZfkKGGU/X/Qx7Ordix0XEzhp1YIGRcC2oAZz7bS4nLN55o30jukPY6o0dsDZ84ZZcTpHJBOjtmFK83026fog8etGfeST3rcVBM93oujOlzuPTObHbhUuwLZGOwiWEZDXJSVKjGCXvDdmXaPgJJUrqKr12AOpk5Q8ehXNRQyVsqD/AJisL2nJzXwebLR/UupWx65PfLwy+rtfsLniRxJA++uti209/kml0hn4BF43TQtBDqjCHgQHtOF0btx7wVlLbcdosRNWz1DUpDMt+c0cRtHEeAXRm2qn9IJ4qMO1viFGeKMikM0ofoylw9JqdUa4X7WlaCjaQ8kDZlrwBjzHisJ076P9XUbWoDAx3vFpyD52CIEjuSubpGKbcDgchltJO8k7Sdq43neKXFnU8UcseUQj04tVTqjRpOc0vkS3U7XmdjRplnJC5Z0Uvo4zZ3nKSaRPDVnxHfwWx6XX6abg+curflAMudDcp2zhz2LnvRi4KlpqtqYixrXAyBLnOaQSGzkAMpJ5Zp4zjOMpS0jKDhSRuRZ+sMDv5KS2dHWvZhwwOA+KPWRjKYgN5nUlGbK9rsiFyJ29MpKRw+9Oj9Wi49meMajj+Kr2G0wWuOrSBO0bII3Lu1suxlQaBcx6d9Huq+VYIEw6OO3zXRHM3+M/9gVdogZbGttQqzGN0O3SNDHHLz3rr902gPa0jQCOXBfO9OqS5pJ3A8wMj3rqvRS+DEGdM88xvI3pZf45JjyX2RaOj2Spkd05KbGOKoWSq5zQWhTS/wCgV6EHaPMkqZZc8fkL1rgqnWO+ifAr0VuCYWgTX9931j6pidU948z6pqkOj1JJJYJxao+OMSdQ3SN/f5LQ9HbOwOqEmezt3bVmbPRLhiziHAQ3Hnx4a/iFo7qp9pwxHTPcZ2LhVKvYhnrmqD/mGkRoXN117Vk/uu6V3loBjLRcHo9i/wCznfUoDxphi7lbiS0AAkyDkJ2gHyK9LuMf0gFhgxsIjYUArDC4bojlulHbBTqGcoA2mAh97UoJw6T4FQnHVl8MvBT6jE6Bqcyf3QM/w70aru07vifghljeGsDidSZ5AwM+4q2yrJETv0jYR8VfFGkTyy5MuF0/HiFmLBcrDVc9rcNMOPVs5HXg2ZIHFHbRWa1pxPazI5ucGjzQl3S676UYrbQyBENqNeeUMkyumGRxT49vRzzxqdX0NsVkLbzfVluE0BTAk4pDgTlH7u9aaiNeeXgPjK59V9od003uqNq1ajtIZSfGpOWINGpO1UHe2SzMBwWSsSST23U2AkngXcEruRRRo6NWEOmcj8PyFUt1Nr24cW85DgfxXNv8VbbaP/TXaDujrbR5U2tSZauklcfJ2N1Of/hZS/7hyRxYeJZ6b0+rvC6YOWNgnTWpZ/6l0nBxK5pZ+gd9V69nr2yrSIoVKbwH1Ria1r2OcGikwiSGDbsC6DbxBkE57kmTwMWoO9eguQd1d40cVYs1pedXKVhoIPbiBa4Ag5EEZFc9ZZi2q5rvfEjDnAP99e9bsWg8EMv6l1jMYDQ5oOZy7MZ58IXN8rHzja7R0fGycZU/Jy+/WvtFpFBhlxOGdg4ngIPgt7dNlZZ6Yp0xk0Bs8B65yTxJQvordUGrXqCHOc5o3hrTB8SPBqOVDOi5Jy0orwdUnsY6pmjV21gQgJV6xVMMKcXTBJaNG2ogHSWzCq1zNkA+qvUrTNQMOsLx7MRcOQ9VWTtaEjpnGbXd7aRcx8g/Md5gFEej99imWyOB4havpL0ddWBDIDh2gd4Go81j7rulwecWcZA79ZIT81KP5HQv6Ov9Gr5a7s4gBPu5k5axlpqtOLYz6QXObCCGOkZtALToQZkn4+K07nldHxszao4vk4kpWjQi0s+m3xCcKjd48QswXFNLzuXXzOTiTWojG7mfVRqJ5Jy0UgKSxz1JeSkhZjkr6GFjWxlBGQnMwcvD8M4Ra7aWJ741jJB7TWljNJzAnef9vzoTNxPl7uXxXKoWkwuNSZjekbm2W9rPUc44KZs1RzjLjhFSXnLM5AroNq9r13sENbXqHP3aYaO/rHNPkpbZ0HstsqC0VzVLsIZha8NbDZIOQxT2jtVux+z27KeYsbXHfUdUqeTnEeS9BShxQlGXtHtspt/VWBx41Kwb5Na71QU+0a87Ri6iyNcHOe6W0qtYjE4kNlpgxMabF16xXNZaP6qy0af1KTGnxAREPQ5R9DLXRxWm/pJXaA2jVY2Mh1dGjx/zYd5qdvQO/q3622YOD7VUgfZpAhdlxJYkfsfgBySy+xZ5OKtb2ztw0XPJ+0549EesfsesLffr2h/AGmxvkyfNbw1BvHil+ktG1B5JewmfsXs1uqnn+iB531KlV/8ACXYfJH7B0fsdH9VY7Ozi2jTB8QJXv6aBsKX/ABB2xnqUvJ+QBVrticChQrVToI7h8V6aVQ6v8z8ELBQRqvABkwgFrEtV9lhG1x7grAsLDkQTzP4LGMhUcp7FJJgE8hK1tGwUhpSZzIBPiVdbwRUTNmRfZ6gEmm4D6pUGPYtvKA9JrZTa3D2cR1MAlreeydEuRqEXJhhcnRmK75yHfuVWrUGg7zv/ALKOrXnIabvxUWFeNKVs9JRolp5lWHGXtbsGZ5BR0BAlQVa2EE7XeQQugl2yWjFamnefJGrJUDnv4Yj54R93zWXuit8q6p9BpjnGXmUc6OietPACU+N2LNUErEzGQTskeP8AugNu6PspOBYCBBLgTMuBmROcH4I9czsyOKtX8zJhgRJ14gfguiONTiS+145AWhYA0kyTiHunPLPbzPoiDKcbSdwMZJ1nzaDtTiujFhUdksmZyGJrk4lNcrkBsL1JJAwpSTZXqwTjDrWGgAlwnMQAR5hG+jNXE8xJ7OadeXQutSY01KlMa5NMwIiSX4REuaPtAZTK1ly9DG0AZrudJnJoZ8XJIwqNFJyTk6Lt1WlrWlrjBBnPkrht9MCcU8gUm3dTGwnmfwhI0WN0YEbaESIje7fmtcfAfivDeT9ergbSZOXkvajzsAVSqHn50ckjyMdY7JKl9U9Ot/6QvG3mHaNeeeSECxVaZlsVBuPZd3O08UWsNuogdo9WRqKkN8Do7uJVYzUhJQkgpZWAjtNj1Uv6MdgB8lXF5Utjwfqgv+6CpGXgT7lJ54mGt8ZJ8kz4gSl6JQHD5oHcpG1OKiFaudlNnOX+YhehjvnOnuA7slNw9DcvZabUUde8qTHNa+o1pdOEExMawmjL8/kIL0ntFRrQ1pAa8EExnrmPRF/irZork6Qdq3tSaSDVbIAdAzMHSI1PBTMvCnAdiyIBB2EHRcys7DigZlauhQr1AxrHMaGzjD2kkzBaRH2p7kkcrl4KzwqK7NWa3YcWQ4gEgTqYyBjPVZe6/aHRkU7dSfY60xFSTTMAZipGQz1MDii93WGo1wc+rMfNa0NB56nzUfSljHMa19Om8EmW1KYfIjYSeyZIzz3KvOo8mQ4pukT3tf7aYApw8kAh0y2CJBkarGWis6q4lxJnM8SrNYTl5D8FXqvAyC8vNmlkf9HbixqC12QugZBeMEpsyp2NhQKj3uAb68kDtlpkq1elqjsjvQpubkr2PFBWw9lnMye7P8FqejrcNFzjtMLLUxs/PFHrVXNOixg1MPPwVMbrYk1egrdM4iUZt1HraRA94ZgcRs780MsHu4t4lXbBae1noV2YZcTlyxsoWU9gbOeqe4q1b6GF2WjpI+P54qm5dpzHiaU5McVjCleEryV4SgE9lJNlJAxF0otLKdNriKJdJDetBd2S09ZAAnTXh3Im5+SBdLKhFNsEa/8AudW6YIaG5GcyORwnOEVNURtTN6Mhz3KvUfxHeYXj6qG3lRNRpbJHLLNSbKJBMWF5zGHnM+ikbdTtrwOQn8FlrPeFos5gkubvnPw0KO3f0opVMiQDu2+BTxWOQJOaCTLsYNST3x6KKvdbfmGOBkhTVLzotzdWY36zgPVUa/Sexs1tDe6XegVPqg10Jzl7KNvvE2MF1Sg9zRnipsxxzI071dui/qFpbio1Q7eNHN4Oae03kVWf0vs/zG1Kn1WGPEoFa6dO01MYsYou2VmvwVPGnrPFLagqsanLtG1LxvVG131Qp+9VaDuBknlGfkgbbvLh8pVqP5uPoIB71Zs9gpM0Y0cgFN5n4Q6xLyR2jpWTlRs1R+ySMI/ij0QK13vbHPm0hjaW4HME6GYAPgtUKY2eiG3rYC8RCSU5NbHjGKZXuukHvmMh4ngtSbScg3IwATtgaBYi5qv6O/qXzDz2TMhpIENM7Msua0WLVcrm46RaSsJ0L5h5DcwzJ7pMT9EDaePFUrfeRqu7RyGmUZSglzWiaTp94VKmIfbMT3Qp3FTllk1TZlBJk1e1DYFQLpXtQpoKiUWiWmE21WoU2lx2acTsCa+tsCzV6Wx1apgb7jDE73bTy2I0Gh/XlxLidc1dslKc4yUNGxkiOKLMYGiN3qkbHLNipS4bh+SvbdaOsqZaZAdyq1raKbYGpU1wNxvk5xmeHPctd6BXk2DexSY3aQmtcYfAMgZQJzletvChI6xwJHu6wOB3q5QtTXZMqMG4NzPhkupb6ZzPXgYKlV1NuNkADV2RnKIHKZUBVm2uGQ2ic515qmXLvxKo9nLN2+j0lPs1DGdw2lQtzMBFrNSyAHinFosMu+mWxh75M+KA2hmBxbuJC1I7Iz2ZrHXhaJL3jPNxA37gnkhUz0u5pKjZbWXtxERyM8/P0SSUEt2uiypGNgMaHRzdDLXDNpyGm4L11WEkkoxWfXOzJVH2glJJTmVgVqonX8VSr3W13DlkkkossivVuKm8jHidG9xjyVuz3XRp+7TaOQHrqkks5SfbNSRcZEwAp2g70klgMlYBxKfVrhjcRGQ3apJI3oABtPTNjTDKTnH94ho8pQm09MLQ+cIYwcBJ8TI8kkkOTofijLXheVV7pfVcXTkdIjgFu+jV8m0UsThDmnC7cSM5HjokkjkS4gvZebRDXlzcg73hx3pV3wkkuJrZVbKbqiiq14XqS3gK7KdutBbTJ2mRO6BJI4oDZK7nQWOwtjIADzSSRX8Q+QxdFveA8POKCIMAa7FJbbwLRpmkkpyWx0UruxV6kF0DXu/Fby67LSFLDBGun51XqSKX5ULN6I6tlpaMaQSc3OzMcNyM3Hc7WdrEZOzZySSVscU5EpyfEmtUh7gd5/soC5JJemujgZJRq4QXxOwJjLzfr4bh3JJIozG2i86jxDnGNwACpOKSSDZkRkLxJJCzH//Z",
      stats: [
        { value: "300+", label: "Specialists" },
        { value: "24/7", label: "Availability" },
        { value: "HD", label: "Quality" }
      ]
    },
  ];

  return (
    <div className="min-h-screen mt-32 bg-gradient-to-b from-indigo-50 to-white">
      {/* Floating Mobile Frame - Modified with landscape orientation content */}
      <div 
        ref={mobileFrameRef}
        className="fixed z-40 transition-all duration-700 ease-in-out"
        style={{
          top: scrollProgress < 0.2 ? '25%' : '25%',
          right: scrollProgress < 0.2 ? '50%' : '10%',
          transform: `translate(${scrollProgress < 0.2 ? '50%' : '0'}, -50%) 
                     scale(${0.7 + scrollProgress * 0.2}) 
                     rotate(${scrollProgress < 0.2 ? '0deg' : '90deg'})`,
          width: '280px',
          height: scrollProgress < 0.2 ? '160px' : '560px',
          borderRadius: '24px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          background: 'white',
          border: '12px solid #1e293b',
          overflow: 'hidden',
          opacity: scrollProgress > 0.5 ? 0 : 1,
          pointerEvents: scrollProgress > 0.55 ? 'none' : 'auto',
          right: scrollProgress < 0.2 ? '50%' : (scrollProgress < 0.4 ? '0.5%' : '2%'),
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-6 bg-gray-800 flex items-center justify-center z-10">
          <div className="w-16 h-2 bg-gray-600 rounded-full"></div>
        </div>
        <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-violet-800 overflow-auto p-4">
          {/* Responsive content based on orientation */}
          <div className="h-full flex flex-col justify-center items-center text-white">
            {scrollProgress < 0.2 ? (
              // Portrait mode content
              <>
                <Stethoscope className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">MedJourney App</h3>
                <p className="text-sm opacity-80 text-center">Connect with world-class healthcare providers globally</p>
              </>
            ) : (
              // Landscape mode content - Horizontal layout with video call focus
              <div className="flex flex-row items-center justify-between w-full h-full">
  {/* Remote Doctor Card */}
  <div className="flex-1 p-2 -ml-5 transform -rotate-90 flex flex-col justify-center items-center">
    <Video className="w-10 h-10 " />
    <p className="text-lg font-bold whitespace-nowrap ">Remote Doctor</p>
    {/* <p className="text-xs opacity-80 text-center">Connect virtually anywhere</p> */}
  </div>

  {/* Rotated Doctor Info Card */}
  <div className="flex-1 p-2 bg-indigo-800/40 rounded-lg h-4/5 flex items-center justify-center">
    <div className="transform -rotate-90 flex flex-col justify-center items-center">
      <div className="rounded-full bg-white/20 p-3 mb-2">
        <UserRound className="w-6 h-6" />
      </div>
      <div className="text-center">
        <p className="text-xs font-bold">Dr. Sarah Chen</p>
        <p className="text-xs opacity-70">Cardiology</p>
        <div className="mt-2 flex justify-center">
          <button className="bg-white/20 rounded-full p-1">
            <Phone className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

            )}
            
            {/* Dynamic content based on scroll position */}
            <div className={`mt-6 flex ${scrollProgress < 0.2 ? 'flex-col' : 'flex-row flex-wrap justify-center'} gap-2 w-full max-w-xs`}>
              {scrollProgress > 0.3 && (
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5" />
                    <span className="text-sm">500+ Partner Hospitals</span>
                  </div>
                </div>
              )}
              
              {scrollProgress > 0.4 && (
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <UserRound className="w-5 h-5" />
                    <span className="text-sm">24/7 Personal Concierge</span>
                  </div>
                </div>
              )}
              
              {scrollProgress > 0.5 && scrollProgress < 0.6 && (
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <Video className="w-5 h-5" />
                    <span className="text-sm">Remote Video Consultations</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Hero Section with 3D-like effect */}
      <div className="relative bg-gradient-to-br from-indigo-900 to-violet-800 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-indigo-800 opacity-50"></div>
          <div className="absolute inset-0 bg-cover bg-center" style={{ 
            backgroundImage: "url('/api/placeholder/1200/800')",
            filter: "blur(3px)"
          }}></div>
          
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="absolute rounded-full bg-white/10"
                style={{
                  width: `${100 + i * 50}px`,
                  height: `${100 + i * 50}px`,
                  top: `${20 + i * 15}%`,
                  left: `${10 + i * 18}%`,
                  animation: `float ${5 + i}s ease-in-out infinite alternate`
                }}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-32 lg:py-48 relative z-10">
          <div className="flex flex-col items-center justify-between gap-12">
            <div className="md:w-1/2 text-white text-center">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                Medical Excellence <br />Without Borders
              </h1>
              <p className="text-xl bg-indigo-800/70 p-4 rounded-lg mb-12 leading-relaxed max-w-lg mx-auto">
                A seamless healthcare journey connecting you to world-class medical care with personalized assistance every step of the way.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    document.getElementById('speciality')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 bg-white text-indigo-900 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors shadow-lg"
                >
                  Find Specialists <ChevronRight className="w-5 h-5" />
                </button>

                <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                  How It Works
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Quick Contact Floating Buttons */}
      <div className="fixed left-6 top-1/3 flex flex-col gap-3 z-50">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110">
          <Phone className="w-6 h-6" />
        </button>
        <button className="bg-violet-500 hover:bg-violet-600 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110">
          <Heart className="w-6 h-6" />
        </button>
        {/* Added Video Call Quick Button */}
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110">
          <Video className="w-6 h-6" />
        </button>
      </div>

      {/* Frame Attachment Point - Empty space where the floating frame will dock */}
      <div 
        ref={frameAttachmentRef} 
        className="container mx-auto px-4 py-16 my-16"
        style={{
          display: scrollProgress > 0.4 && scrollProgress < 0.6 ? 'block' : 'none',
          height: '600px'
        }}
      >
        <div className="bg-indigo-50 rounded-3xl p-8 h-full flex items-center justify-center shadow-inner">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">Mobile Experience</h3>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Our mobile app provides the same comprehensive features with an intuitive interface for on-the-go access.
            </p>
            <div 
              className="h-96 w-72 mx-auto mt-8 rounded-3xl border-4 border-dashed border-indigo-300 flex items-center justify-center"
              style={{
                opacity: scrollProgress > 0.55 ? 1 : 0,
                transition: 'opacity 0.5s ease-in-out'
              }}
            >
              <p className="text-indigo-400 font-medium">Mobile App View</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Interactive Features Section */}
      <div ref={targetSectionRef} className="container mx-auto px-4 py-32" id="speciality">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Your Complete Medical Journey Solution
          </h2>
          <p className="text-xl text-gray-600">
            Every aspect of your healthcare experience reimagined for simplicity, quality, and peace of mind.
          </p>
        </div>
        
        {/* Interactive Tabs */}
        <div className="max-w-5xl mx-auto items-center">
          <div className="flex justify-center items-center overflow-x-auto space-x-1 md:space-x-4 mb-12 pb-2">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex flex-col items-center min-w-28 md:min-w-36 px-6 py-4 rounded-lg transition-all ${
                  activeTab === index 
                    ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <div className={`${activeTab === index ? 'text-white' : 'text-indigo-600'}`}>
                  {tab.icon}
                </div>
                <span className="mt-2 font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-indigo-100">
            <div className="flex flex-col md:flex-row items-stretch">
              <div className="md:w-1/2">
                <img 
                  src={tabContent[activeTab].image} 
                  alt={tabContent[activeTab].title} 
                  className="w-full h-full object-cover"
                  style={{ minHeight: '300px' }}
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {tabContent[activeTab].title}
                  </h3>
                  <p className="text-gray-600 mb-8">
                    {tabContent[activeTab].description}
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  {tabContent[activeTab].stats.map((stat, index) => (
                    <div 
                      key={index} 
                      className="bg-indigo-50 p-4 rounded-lg shadow text-center hover:shadow-md transition-all"
                    >
                      <div className="text-xl font-bold text-indigo-600">{stat.value}</div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Consultation Request Card (moved from floating to a fixed section) */}
      <div className="container mx-auto px-4 py-16 bg-indigo-50 rounded-3xl my-16 shadow-inner max-w-6xl">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <div 
              ref={floatingElementRef}
              className="bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-500 relative z-10"
            >
              <div className="flex gap-4 mb-6 items-center">
                <div className="bg-indigo-100 rounded-full p-3">
                  <Stethoscope className="w-8 h-8 text-indigo-700" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Schedule a Consultation</h3>
                  <p className="text-gray-600">Free initial assessment of your needs</p>
                </div>
              </div>
              
              <hr className="my-6 border-gray-200" />
              
              <div className="space-y-4">
                {["Personalized medical recommendations", "Cost estimates and payment options", "Complete travel & accommodation plan", "Remote video consultation options"].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-8 px-6 py-4 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg">
                <Calendar className="w-5 h-5" />
                Request Your Plan
              </button>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Health Journey Starts Here</h2>
            <p className="text-lg text-gray-600 mb-8">
              Our medical concierge team specializes in creating personalized healthcare journeys that prioritize your needs, preferences, and comfort while connecting you with world-class specialists.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: "Expert Matching", desc: "Find the perfect specialist for your needs" },
                { title: "Travel Planning", desc: "Seamless logistics from door to door" },
                { title: "Language Support", desc: "Clear communication in your preferred language" },
                { title: "Virtual Options", desc: "Remote consultations when appropriate" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg shadow">
                  <h4 className="font-semibold text-indigo-700">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Call-to-Action Card */}
      <div 
        className={`fixed bottom-20 right-6 bg-white rounded-lg shadow-2xl p-4 transition-all duration-500 z-40 max-w-xs ${
          scrolled && scrollProgress < 0.9 ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto' : 'translate-y-20 opacity-0 scale-90 pointer-events-none'
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="bg-indigo-100 p-2 rounded-full flex-shrink-0">
            <Calendar className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">Schedule your consultation</p>
            <p className="text-xs text-gray-500 mb-2">Our specialists are ready to help</p>
            <div className="flex gap-2">
              <button
                className="text-xs bg-indigo-600 text-white px-3 py-1 rounded font-medium hover:bg-indigo-700 transition-colors"
                onClick={() => navigate('/doctors')}
              >
                Book Now
              </button>
              <button
                className="text-xs bg-emerald-500 text-white px-3 py-1 rounded font-medium hover:bg-emerald-600 transition-colors flex items-center gap-1"
                onClick={() => navigate('/my-appointments')}
              >
                <Video className="w-3 h-3" /> Virtual
              </button>
            </div>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>
      </div>
      
      {/* Sticky Action Bar that appears when scrolling */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 py-3 px-4 transition-transform duration-300 z-50 ${
        scrolled ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 p-2 rounded-full">
              <Globe className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Ready to start your medical journey?</p>
              <p className="text-sm text-gray-600">50+ countries, 500+ hospitals, 1000+ specialists</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              className="bg-emerald-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-600 transition-colors whitespace-nowrap mt-3 sm:mt-0 shadow-md flex items-center gap-2"
              onClick={() => navigate('/my-appointments')}
            >
              <Video className="w-5 h-5" /> Quick Video Consult
            </button>
            <button
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors whitespace-nowrap mt-3 sm:mt-0 shadow-md"
              onClick={() => navigate('/login')}
            >
              Get Started Now
            </button>
          </div>
        </div>
      </div>
      
      {/* Add some animation styles */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-20px); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default App;
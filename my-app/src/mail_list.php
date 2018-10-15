<?php 

$localhost="localhost";
$user="root";
$password="";
$database="react_mail";
$con=mysqli_connect($localhost,$user,$password,$database);

$query="select * from mailbox";
$qry_exe=mysqli_query($con,$query);
$qry_numRows=mysqli_num_rows($qry_exe);
$result=array();
if($qry_numRows > 0){
	while($res=mysqli_fetch_assoc($qry_exe)){
		$result[]=$res ;
 }
}

echo json_encode($result);

 ?>
